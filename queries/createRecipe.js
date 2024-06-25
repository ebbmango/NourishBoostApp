import toSQLiteParameters from "../functions/toSQLiteParameters";

const query =
  "INSERT INTO foods (name, isDeleted, type) VALUES ($recipeName, 0, 'recipe');";

const createRecipe = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createRecipe;
