import express from "express";
// ROUTERS
import postRouter from "./post.js";
import categoryRouter from "./category.js";
import commentRouter from "./comment.js";

const router = express.Router();

router.use("/post", postRouter);
router.use("/category", categoryRouter);
router.use("/comment", commentRouter);

export default router;
