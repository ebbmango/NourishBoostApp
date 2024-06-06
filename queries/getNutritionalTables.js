const query = ` 
SELECT 
nt.id AS tableId,
fd.name AS foodName,
nt.foodId AS foodId,
nt.baseMeasure as baseMeasure,
un.unit,
nt.kcals,
nt.carbs,
nt.fats,
nt.protein
FROM foodNutritionalTables nt
INNER JOIN foods fd ON foodId = fd.id
INNER JOIN units un ON nt.unitId = un.id
WHERE foodId = $foodId;
`;

export default function getNutritionalTables({ database, foodId }) {
  return database.getAllSync(query, { $foodId: foodId });
}
