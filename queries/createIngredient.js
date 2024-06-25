import toSQLiteParameters from "../functions/toSQLiteParameters";

const query =
  "INSERT INTO ingredients (recipeId, nutrientsId, amount) VALUES ($recipeId, $nutrientsId, $amount);";

const createIngredient = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createIngredient;
