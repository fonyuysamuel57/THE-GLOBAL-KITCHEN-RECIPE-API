const mongoose = require("mongoose");
const recipeService = require("../services/recipeService");

exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);

    return res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
//Controller to get all recipes
exports.getRecipes = async (req, res, next) => {
  try {
    const { category } = req.query;
    const recipes = await recipeService.getAllRecipes(category);

    return res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};
//cPNTROLLER FUNCTION TO GET RECIPE BY ID
exports.getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `No recipe found with id ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
//controller function to be able to update a recipe

exports.updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `"${id}" is not a valid recipe ID`,
      });
    }

    const updatedRecipe = await recipeService.updateRecipe(id, req.body);

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: `No recipe found with id ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};