const query = "INSERT INTO foods (name) VALUES ($foodName);";

export default function createFood(database, { foodName }) {
  return database.runSync(query, { $foodName: foodName });
}
