import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "DELETE FROM foods WHERE id = $foodId;";

const deleteFood = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default deleteFood;
