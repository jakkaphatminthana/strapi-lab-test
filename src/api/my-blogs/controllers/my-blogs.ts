/**
 * A set of functions called "actions" for `my-blogs`
 */

export default {
  myBlogs: async (ctx) => {
    try {
      const data = await strapi.service("api::my-blogs.my-blogs").myBlogs();
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error myBlogs: ", err);
      ctx.throw(400, "Get myBlogs error", { moreDetail: err.message });
    }
  },

  findOne: async (ctx) => {
    try {
      const { id } = ctx.params;
      const data = await strapi.service("api::my-blogs.my-blogs").findOne(id);
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error myBlogs findOne: ", err);
      ctx.throw(400, "findOne myBlogs error", { moreDetail: err.message });
    }
  },

  findFiltered: async (ctx) => {
    try {
      const { startDate, endDate, title, authorID, perPage, page } = ctx.query;

      const data = await strapi.service("api::my-blogs.my-blogs").findFilter({
        startDate: startDate,
        endDate: endDate,
        title: title,
        authorID: authorID,
        perPage: perPage,
        page: page,
      });
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error findFiltered:", err);
      ctx.throw(400, "filtering blogs error", { moreDetail: err.message });
    }
  },
};
