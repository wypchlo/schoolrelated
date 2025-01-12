import express from "express";
import mainRouter from "./routes";

const PORT: number = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.listen(PORT, () => {
    console.log("Listening on port 3000!!!");
});
