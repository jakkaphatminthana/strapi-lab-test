/**
 * A set of functions called "actions" for `my-blogs`
 */

export default {
  myBlogs: async (ctx, next) => {
    try {
      const data = await strapi.service("api::my-blogs.my-blogs").myBlogs();
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error myBlogs: ", err);
      ctx.badRequest("Get myBlogs error", {
        moreDetail: err.message,
      });
    }
  },

  findOne: async (ctx, next) => {
    try {
      const { id } = ctx.params;
      const data = await strapi.service("api::my-blogs.my-blogs").findOne(id);
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error myBlogs findOne: ", err);
      ctx.badRequest("findOne myBlogs error", {
        moreDetail: err.message,
      });
    }
  },

  findFiltered: async (ctx, next) => {
    try {
      const { startDate, endDate, title, authorID } = ctx.query;

      const data = await strapi.service("api::my-blogs.my-blogs").findFilter({
        startDate: startDate,
        endDate: endDate,
        title: title,
        authorID: authorID,
      });
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error findFiltered:", err);
      ctx.badRequest("Error in filtering blogs", {
        moreDetail: err.message,
      });
    }
  },
};
