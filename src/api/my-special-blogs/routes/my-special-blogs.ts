export default {
  routes: [
    {
      method: "GET",
      path: "/my-special-blogs",
      handler: "my-special-blogs.findFiltered", //<api-name>.<controller-name>.<action-name>
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/my-special-blogs/:id",
      handler: "my-special-blogs.findOne", //<api-name>.<controller-name>.<action-name>
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
