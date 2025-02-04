/**
 * blog controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    // async find(ctx) {
    //   const blogs = await strapi.entityService.findMany("api::blog.blog", {
    //     // fields: ["id", "title", "description"],
    //     sort: { createdAt: "desc" },
    //   });
    //   ctx.body = blogs;
    // },
    // async findOne(ctx) {
    //   const { id } = ctx.params;
    //   console.log("ctx.params = ", ctx.params);
    //   const blog = await strapi.db.query("api::blog.blog").findOne({
    //     where: { id },
    //     select: ["id", "title", "description"],
    //   });
    //   if (!blog) {
    //     return ctx.notFound("Blog not found");
    //   }
    //   ctx.body = blog;
    // },
  })
);
