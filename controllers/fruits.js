import { Router } from "express";
import Fruit from "../models/fruit.js";

const fruitsRouter = Router();

fruitsRouter.get("/", async (req, res) => {
  res.render("index.ejs");
});

fruitsRouter.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

fruitsRouter.get("/fruits", async (req, res) => {
  const fruits = await Fruit.find({});
  res.render("fruits/index.ejs", { fruits });
});

fruitsRouter.post("/fruits", async (req, res) => {
  let { name, isReadyToEat } = req.body;
  if (isReadyToEat) {
    isReadytoEat = true;
  } else {
    isReadyToEat
  }

  const fruit = await Fruit.create({ name, isReadyToEat });


res.redirect("/fruits");

});

export default fruitsRouter;
