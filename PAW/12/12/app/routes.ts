import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/posts", "routes/posts.tsx"),
    route("/categories", "routes/categories.tsx"),
    route("/newcategory", "routes/newcategory.tsx"),
    route("/newpost", "routes/newpost.tsx"),
    route("/postdetails/:id", "routes/postdetails.tsx")
] satisfies RouteConfig;
