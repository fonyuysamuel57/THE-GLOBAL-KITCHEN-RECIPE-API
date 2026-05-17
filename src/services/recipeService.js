
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
    //API model to egt new recipe
    
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
//API model to get all recipes
exports.getAllRecipes = async (category) => {
  const filter = {};
  if (category) {
    filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  }
  const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
  return recipes;
};