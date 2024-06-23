import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "SELECT * FROM entries WHERE entries.nutrientsId = $nutrientsId;";

const getEntriesByNutrients = (database, params) => {
  return database.getAllSync(query, toSQLiteParameters(params));
};

export default getEntriesByNutrients;
