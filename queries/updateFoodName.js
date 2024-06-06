const query = `UPDATE foods SET name = $newFoodName WHERE 1 = $foodId;`;

export default function updateFoodName(database, { foodId, newFoodName }) {
  return database.runSync(query, {
    $foodId: foodId,
    $newFoodName: newFoodName,
  });
}
