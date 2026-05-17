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