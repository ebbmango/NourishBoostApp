import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = ` 
SELECT 
    n.id AS id,
    n.baseMeasure AS baseMeasure,
    u.id AS unitId,
    u.symbol AS unitSymbol,
    n.kcals,
    n.carbs,
    n.fats,
    n.protein
FROM 
    nutrients AS n
INNER JOIN 
    units AS u ON n.unitId = u.id
WHERE 
    n.foodId = $foodId;
`;

// This query gets all the nutritional tables for a particular food item.
const getNutrientsByFood = (database, params) => {
  const tables = database.getAllSync(query, toSQLiteParameters(params));
  return tables.map((table) => ({
    id: table.id,
    baseMeasure: table.baseMeasure,
    kcals: table.kcals,
    carbs: table.carbs,
    fats: table.fats,
    protein: table.protein,
    unit: {
      id: table.unitId,
      symbol: table.unitSymbol,
    },
  }));
};

export default getNutrientsByFood;
