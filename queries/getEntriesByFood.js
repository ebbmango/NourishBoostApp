import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "SELECT * FROM entries WHERE entries.foodId = $foodId;";

const getEntriesByFood = (database, params) => {
  return database.getAllSync(query, toSQLiteParameters(params));
};

export default getEntriesByFood;
