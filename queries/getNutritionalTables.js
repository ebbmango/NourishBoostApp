const query = ` 
SELECT 
nt.id AS tableId,
fd.name AS foodName,
nt.food_id AS foodId,
nt.base_measure as baseMeasure,
un.unit,
nt.calories,
nt.carbs,
nt.fats,
nt.protein
FROM food_nutri_table nt
INNER JOIN foods fd ON foodId = fd.id
INNER JOIN units un ON nt.unit_id = un.id
WHERE foodId = $food_id;
`;

export default function getNutritionalTables({ database, foodId }) {
  return database.getAllSync(query, { $food_id: foodId });
}
