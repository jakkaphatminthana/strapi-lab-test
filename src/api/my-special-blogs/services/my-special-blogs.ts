/**
 * my-special-blogs service
 */

import DateUtils from "../../../utils/date-util";
import MySpecialBlogUtils, {
  MySpecialBlogModel,
  RawMySpecialBlog,
} from "../models/my-special-blogs";

export default {
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

      const entries = await strapi.db
        .query("api::special-blog.special-blog")
        .findMany({
          select: ["id", "title", "description", "createdAt"],
          orderBy: { createdAt: "asc" },
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
      const formattedEntries: MySpecialBlogModel[] = entries.map((item) =>
        MySpecialBlogUtils.toModel(item)
      );

      // Get total count of records that match filters
      const totalCount = await strapi.db
        .query("api::special-blog.special-blog")
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
      throw error;
    }
  },

  async findOne(id: number) {
    try {
      const entry = (await strapi.db
        .query("api::special-blog.special-blog")
        .findOne({
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
        })) as RawMySpecialBlog | null;

      if (!entry) {
        throw new Error(`data not found`);
      }

      return MySpecialBlogUtils.toModel(entry);
    } catch (err) {
      console.error("Service Error findOne:", err);
      throw err;
    }
  },
};
