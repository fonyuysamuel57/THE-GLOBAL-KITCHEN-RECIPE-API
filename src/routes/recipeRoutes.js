const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeControllers");

router.route("/").get(recipe.getRecipes).post(recipe.createRecipe)

module.exports = router;