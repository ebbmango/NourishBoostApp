const query = "SELECT * FROM foods WHERE id = $foodId;";

export default function getFood(database, { foodId }) {
  return database.getFirstSync(query, { $foodId: foodId });
}
