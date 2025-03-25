import { Router } from "express";
import Fruit from "../models/fruit.js";

const fruitsRouter = Router();

fruitsRouter.get("/", async (req, res) => {
  res.render("index");
});

fruitsRouter.get("/fruits/new", (req, res) => {
  res.render("fruits/new");
});

fruitsRouter.get("/fruits", async (req, res) => {
  const fruits = await Fruit.find({});
  res.render("fruits/index", { fruits });
});

fruitsRouter.post("/fruits", async (req, res) => {
  let { name, isReadyToEat } = req.body;
  if (isReadyToEat) {
    isReadyToEat = true;
  } else {
    isReadyToEat;
  }

  const fruit = await Fruit.create({ name, isReadyToEat });

  res.redirect("/fruits");
});

fruitsRouter.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show", { fruit: foundFruit });
});

fruitsRouter.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

fruitsRouter.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});

// server.js

fruitsRouter.put("/fruits/:fruitId", async (req, res) => {
  // Handle the 'isReadyToEat' checkbox data
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  // Update the fruit in the database
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  // Redirect to the fruit's show page to see the updates
  res.redirect(`/fruits/${req.params.fruitId}`);
});

export default fruitsRouter;
