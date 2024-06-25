import toSQLiteParameters from "../functions/toSQLiteParameters";

const query =
  "INSERT INTO foods (name, isDeleted, type) VALUES ($foodName, 0, 'food');";

const createFood = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createFood;
