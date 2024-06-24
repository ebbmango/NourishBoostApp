import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "UPDATE foods SET isDeleted = 1 WHERE id = $foodId;";

const setDeletedFood = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default setDeletedFood;
