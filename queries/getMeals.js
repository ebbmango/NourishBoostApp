const query = "SELECT * FROM meals;";

export default function getMeals(database) {
  return database.getAllSync(query);
}
