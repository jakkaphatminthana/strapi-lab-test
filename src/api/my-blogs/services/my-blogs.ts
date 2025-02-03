/**
 * my-blogs service
 */

import DateUtils from "../../../utils/date-util";
import MyBlog, { MyBlogModel, RawMyBlog } from "../models/my-blogs";

export default {
  async myBlogs() {
    try {
      const entries = (await strapi.db.query("api::blog.blog").findMany({
        select: ["id", "title", "description", "createdAt"],
        populate: {
          thumbnail: {
            select: ["url"],
          },
          author: {
            select: ["id", "name", "publisher"],
          },
        },
      })) as RawMyBlog[];

      if (!entries || !Array.isArray(entries)) {
        throw new Error("No data found");
      }

      const formattedEntries: MyBlogModel[] = entries.map((item) =>
        MyBlog.toModel(item)
      );

      return formattedEntries;
    } catch (err) {
      console.error("Service Error myBlogs:", err);
      throw new Error(`Service Error: ${err.message}`);
    }
  },

  async findOne(id: number) {
    try {
      const entry = (await strapi.db.query("api::blog.blog").findOne({
        select: ["id", "title", "description", "createdAt"],
        where: { id: id },
        populate: {
          thumbnail: {
            select: ["url"],
          },
          author: {
            select: ["id", "name", "publisher"],
          },
        },
      })) as RawMyBlog | null;

      if (!entry) {
        throw new Error(`Blog with ID ${id} not found`);
      }

      return MyBlog.toModel(entry);
    } catch (err) {
      console.error("Service Error myBlogs findOne:", err);
      throw new Error(`Service Error: ${err.message}`);
    }
  },

  async findFilter(params: {
    startDate?: string;
    endDate?: string;
    title?: string;
    authorID?: number;
    perPage?: number;
    page?: number;
  }) {
    try {
      const { startDate, endDate, title, authorID, perPage, page } = params;
      const pageLimit = perPage || 10;
      const pageOffset = page || 0;

      if (startDate && !DateUtils.isValidDate(startDate)) {
        throw new Error("Invalid startDate format");
      }

      if (endDate && !DateUtils.isValidDate(endDate)) {
        throw new Error("Invalid endDate format");
      }

      // filter
      const filters: any = {};

      if (startDate) {
        filters.createdAt = { $gte: new Date(startDate) };
      }
      if (endDate) {
        const endDateWithTime = new Date(endDate);
        endDateWithTime.setHours(23, 59, 59, 999);
        filters.createdAt = { $lte: endDateWithTime };
      }
      if (title) {
        filters.title = { $containsi: title };
      }
      if (authorID) {
        filters.author = { id: { $eq: authorID } };
      }

      const entries = await strapi.db.query("api::blog.blog").findMany({
        select: ["id", "title", "description", "createdAt"],
        populate: {
          thumbnail: {
            select: ["url"],
          },
          author: {
            select: ["id", "name", "publisher"],
          },
        },
        where: filters,
        limit: pageLimit,
        offset: pageOffset,
      });

      if (!entries || !Array.isArray(entries)) {
        throw new Error("No data found");
      }

      const formattedEntries: MyBlogModel[] = entries.map((item) =>
        MyBlog.toModel(item)
      );

      // Get total count of records that match filters
      const totalCount = await strapi.db
        .query("api::blog.blog")
        .count({ filters });

      // Calculate total number of pages
      const lastPage = Math.ceil(totalCount / pageLimit);
      const currentPage = Math.floor(pageOffset / pageLimit) + 1;
      const previousPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < lastPage ? currentPage + 1 : null;

      return {
        data: formattedEntries,
        pagination: {
          total: totalCount,
          previousPage,
          currentPage,
          nextPage,
          lastPage,
          perPage: Number(pageLimit),
        },
      };
    } catch (error) {
      console.error("Service Error findFiltered:", error);
      throw new Error(`Service Error: ${error.message}`);
    }
  },
};
