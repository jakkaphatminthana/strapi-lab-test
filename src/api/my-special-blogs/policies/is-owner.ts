const { PolicyError, UnauthorizedError } = require("@strapi/utils").errors;

export default async (ctx) => {
  const user = ctx.state.user;

  if (!user) {
    console.log("🔴 You must be logged in to access this resource");
    throw new UnauthorizedError(
      "You must be logged in to access this resource"
    );
  }

  // findOne
  if (ctx.params.id) {
    const blog = await strapi.db
      .query("api::special-blog.special-blog")
      .findOne({
        where: { id: ctx.params.id },
        populate: ["owner"],
      });

    if (!blog || blog.owner?.id !== user.id) {
      console.log("🔴 You do not have permission to access this blog");
      throw new PolicyError("You do not have permission to access this blog");
    }
    // finds
  } else {
    // Set the ownerID to the logged-in user's ID if no ownerID is provided
    if (!ctx.query) {
      ctx.query = {}; // หากไม่มี ctx.query เลยให้กำหนดเป็น object
    }

    if (!ctx.query.filters) {
      ctx.query.filters = {}; // กำหนด filters เป็น object เปล่า
    }

    ctx.query.filters.owner = { id: { $eq: user.id } }; // กรองโดย owner ID ของผู้ใช้งานที่ล็อกอิน

    ctx.query.populate = ctx.query.populate || []; // เพิ่มข้อมูล populate
    ctx.query.populate.push("owner"); // ให้ populate ข้อมูล owner

    console.log("🔵 Filters after modification:", ctx.query.filters);
  }

  return true;
};
