import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "INSERT INTO foods (name, isDeleted) VALUES ($foodName, 0);";

const createFood = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createFood;
