import express from "express";
import mainRouter from "./routes/index.js";

const PORT = 3000;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use("/api", mainRouter);

app.listen(PORT, () => console.log("Listening on the port " + PORT));
