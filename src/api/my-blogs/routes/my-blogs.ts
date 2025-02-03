export default {
  routes: [
    {
      method: "GET",
      path: "/my-blogs",
      // handler: "my-blogs.myBlogs", //<api-name>.<controller-name>.<action-name>
      handler: "my-blogs.findFiltered", //<api-name>.<controller-name>.<action-name>
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/my-blogs/:id",
      handler: "my-blogs.findOne", //<api-name>.<controller-name>.<action-name>
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
