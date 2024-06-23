import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "DELETE FROM nutrients WHERE id = $nutrientsId;";

const deleteNutrients = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default deleteNutrients;
