
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
// sERVICE FUNCTION TO GET RECIPE BY ID
exports.getRecipeById = async (id) => {
  const recipe = await Recipe.findById(id);
  return recipe;
};

// function to update a recipe

exports.updateRecipe = async (id, updateData) => {
  // Prevent clients from overwriting the _id field
  delete updateData._id;

  // If cookingTime is being updated, enforce the positive-number rule
  if (updateData.cookingTime !== undefined) {
    const time = Number(updateData.cookingTime);
    if (!Number.isFinite(time) || time <= 0) {
      const error = new Error("Cooking time must be a positive number");
      error.statusCode = 400;
      throw error;
    }
    updateData.cookingTime = time;
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true, // Returned values
      runValidators: true, // Re-run schema validators on the updated fields
    },
  );
  return updatedRecipe;
};

//Function to delete a recipe

exports.deleteRecipe = async (id) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(id);
  return deletedRecipe;
};