import express from "express";
import postRouter from "./postRouter";
import commentRouter from "./commentRouter";
import categoryRouter from "./categoryRouter";

const router = express.Router();

router.use("/wpis", postRouter);
router.use("/komentarz", commentRouter);
router.use("/kategoria", categoryRouter);

export default router;
