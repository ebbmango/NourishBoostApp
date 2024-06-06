const query = ` 
SELECT 
    t.id AS tableId,
    t.baseMeasure AS baseMeasure,
    u.id AS unitId,
    u.symbol AS unitSymbol,
    t.kcals,
    t.carbs,
    t.fats,
    t.protein
FROM 
    foodNutritionalTables AS t
INNER JOIN 
    units AS u ON t.unitId = u.id
WHERE 
    t.foodId = $foodId;
`;

export default function getNutritionalTables(database, { foodId }) {
  const tables = database.getAllSync(query, { $foodId: foodId });
  return tables.map((table) => ({
    baseMeasure: table.baseMeasure,
    carbs: table.carbs,
    fats: table.fats,
    kcals: table.kcals,
    protein: table.protein,
    tableId: table.tableId,
    unit: {
      id: table.unitId,
      symbol: table.unitSymbol,
    },
  }));
}
