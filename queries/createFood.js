import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "INSERT INTO foods (name) VALUES ($foodName);";

const createFood = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createFood;
