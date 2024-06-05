const query = "SELECT * FROM foods;";

export default function getFoods(database) {
  return database.getAllSync(query);
}