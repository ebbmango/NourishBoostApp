import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = ` 
SELECT 
    n.id,
    n.isDeleted,
    n.baseMeasure,
    u.id AS unitId,
    u.symbol AS unitSymbol,
    n.kcals,
    n.carbs,
    n.fats,
    n.protein
FROM 
    nutrients AS n
INNER JOIN 
    units AS u
ON
    n.unitId = u.id
WHERE 
    n.id = $nutrientsId;
`;

// This query a specific nutritional table for a particular food item.
const getNutrientsById = (database, params) => {
  const nutrients = database.getFirstSync(query, toSQLiteParameters(params));

  return {
    baseMeasure: nutrients.baseMeasure,
    carbs: nutrients.carbs,
    fats: nutrients.fats,
    kcals: nutrients.kcals,
    protein: nutrients.protein,
    nutrientsId: nutrients.id,
    isDeleted: nutrients.isDeleted,
    unit: {
      id: nutrients.unitId,
      symbol: nutrients.unitSymbol,
    },
  };
};

export default getNutrientsById;
