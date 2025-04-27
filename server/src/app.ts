import express from "express";

const app = express();

import "./database/connection";
import mainRouter from "./router";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", mainRouter);

export default app;
