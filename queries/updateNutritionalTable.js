const query = `
UPDATE foodNutritionalTables SET
baseMeasure = $baseMeasure,
kcals = $kcals,
carbs = $carbs,
fats = $fats,
protein = $protein
WHERE id = $tableId;
`;

export default function updateNutritionalTable(
  database,
  { tableId, baseMeasure, kcals, carbs, fats, protein }
) {
  return database.runSync(query, {
    $tableId: tableId,
    $baseMeasure: baseMeasure,
    $kcals: kcals,
    $carbs: carbs,
    $fats: fats,
    $protein: protein,
  });
}
