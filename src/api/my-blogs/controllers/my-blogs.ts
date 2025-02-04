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

  createBlog: async (ctx) => {
    try {
      const { title, description, thumbnail, detail, author } =
        ctx.request.body;

      if (!title) {
        return ctx.badRequest("'title' is required");
      }

      const newBlog = await strapi
        .service("api::my-blogs.my-blogs")
        .createBlog({
          title,
          description,
          thumbnail,
          detail,
          author,
        });

      ctx.created(newBlog);
    } catch (err) {
      console.error("Controller Error createBlog:", err);
      ctx.badRequest("Error creating blog", { moreDetail: err.message });
    }
  },

  updateBlog: async (ctx) => {
    try {
      const { id } = ctx.params;
      const { title, description, detail, author, thumbnail } =
        ctx.request.body;

      const updateBlog = await strapi
        .service("api::my-blogs.my-blogs")
        .updateBlog(id, {
          title,
          description,
          detail,
          author,
          thumbnail,
        });
      ctx.body = updateBlog;
    } catch (err) {
      console.error("Controller Error updateBlog:", err);
      ctx.badRequest("Error updating blog", { moreDetail: err.message });
    }
  },
};
