import toSQLiteParameters from "../functions/toSQLiteParameters";

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
    t.foodId = $foodId
AND
    u.id = $unitId;
`;

// This query a specific nutritional table for a particular food item.
const getNutritionalTableByUnit = (database, params) => {
  const table = database.getFirstSync(query, toSQLiteParameters(params));

  return {
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
  };
};

export default getNutritionalTableByUnit;
