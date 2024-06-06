const query = `
INSERT INTO food_nutri_table
(foodId, unitId, baseMeasure, kcals, protein, carbs, fats)
VALUES (
  $foodId,
  $unitId,
  $baseMeasure,
  $calories,
  $protein,
  $carbs,
  $fats
);`;

export default function createNutritionalTable(
  database,
  { foodId, unitId, baseMeasure, calories, protein, carbs, fats }
) {
  database.runSync(query, {
    $foodId: foodId,
    $unitId: unitId,
    $baseMeasure: baseMeasure,
    $calories: calories,
    $protein: protein,
    $carbs: carbs,
    $fats: fats,
  });
}
