const query = "DELETE FROM foods WHERE id = $foodId;";

export default function deleteFood(database, { foodId }) {
  return database.runSync(query, { $foodId: foodId });
}
