
const Recipe = require("../model/Recipe");
exports.createRecipe = async (recipeData) => {
  const {
    title,
    ingredients,
    instructions,
    cookingTime,
    difficulty,
    category,
  } = recipeData;

  //cooking time must be a positive finite number
  if (!Number.isFinite(Number(cookingTime)) || Number(cookingTime) <= 0) {
    const error = new Error("Cooking time must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    cookingTime: Number(cookingTime),
    difficulty,
    category,
  });

  return newRecipe;
};