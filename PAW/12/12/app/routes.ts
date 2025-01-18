import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/posts", "routes/posts.tsx"),
    route("/newpost", "routes/newpost.tsx")
] satisfies RouteConfig;
