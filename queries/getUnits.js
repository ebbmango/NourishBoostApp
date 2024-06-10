const query = `
SELECT units.id, units.symbol
FROM foods
JOIN foodNutritionalTables ON foods.id = foodNutritionalTables.foodId
JOIN units ON foodNutritionalTables.unitId = units.id
WHERE foods.id = $foodId;
`;

export default function getUnits(database, { foodId }) {
  return database.getAllSync(query, { $foodId: foodId });
}
