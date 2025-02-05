/**
 * A set of functions called "actions" for `my-special-blogs`
 */

import { handleError } from "../../../utils/handle-error";

export default {
  findFiltered: async (ctx) => {
    try {
      const { startDate, endDate, title, authorID, perPage, page } = ctx.query;
      console.log("🔴 ctx.query = ", ctx.query);

      const data = await strapi
        .service("api::my-special-blogs.my-special-blogs")
        .findFilter({
          startDate: startDate,
          endDate: endDate,
          title: title,
          authorID: authorID,
          perPage: perPage,
          page: page,
          userID: ctx.state.user.id,
        });
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error findFiltered:", err);
      ctx.throw(400, "filtering blogs error", { moreDetail: err.message });
    }
  },

  findOne: async (ctx) => {
    try {
      const { id } = ctx.params;
      const data = await strapi
        .service("api::my-special-blogs.my-special-blogs")
        .findOne(id);
      ctx.body = data;
    } catch (err) {
      console.error("Controller Error findOne: ", err);
      if (err.message === "data not found") {
        handleError(ctx, 404, "data not found");
      }
      handleError(ctx, 400, "findOne error", err.message);
    }
  },
};
