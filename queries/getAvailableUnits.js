const query = `
SELECT units.id, units.symbol
FROM units
LEFT JOIN foodNutritionalTables ON units.id = foodNutritionalTables.unitId AND foodNutritionalTables.foodId = $foodId
WHERE foodNutritionalTables.unitId IS NULL;
`;

export default function getAvailableUnits(database, { foodId }) {
  return database.getAllSync(query, { $foodId: foodId });
}
