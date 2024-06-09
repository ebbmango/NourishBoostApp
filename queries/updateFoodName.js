const query = `UPDATE foods SET name = $newFoodName WHERE id = $foodId;`;

export default function updateFoodName(database, { foodId, newFoodName }) {
  return database.runSync(query, {
    $foodId: foodId,
    $newFoodName: newFoodName,
  });
}
