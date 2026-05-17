const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeControllers");

router.route("/").post(recipe.createRecipe)

module.exports = router;