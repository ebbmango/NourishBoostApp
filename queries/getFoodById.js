import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "SELECT * FROM foods WHERE id = $foodId;";

const getFoodById = (database, params) => {
  return database.getFirstSync(query, toSQLiteParameters(params));
};

export default getFoodById;
