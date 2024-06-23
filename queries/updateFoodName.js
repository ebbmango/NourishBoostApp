import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `UPDATE foods SET name = $newFoodName WHERE id = $foodId;`;

export default function updateFoodName(database, params) {
  return database.runSync(query, toSQLiteParameters(params));
}
