const query =
  "INSERT INTO entries (foodId, date, amount, unitId, mealId) VALUES ($foodId, $date, $amount, $unitId, $mealId);";

export default function createEntry(
  database,
  { foodId, date, amount, unitId, mealId }
) {
  return database.runSync(query, {
    $foodId: foodId,
    $date: date,
    $amount: amount,
    $unitId: unitId,
    $mealId: mealId,
  });
}
