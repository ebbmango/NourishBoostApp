import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "UPDATE nutrients SET isDeleted = 1 WHERE id = $nutrientsId;";

const setDeletedNutrients = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default setDeletedNutrients;
