import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = ` 
SELECT 
    n.id AS id,
    f.id AS foodId,
    n.baseMeasure AS base,
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
INNER JOIN
    foods AS f ON n.foodId = f.id
WHERE
    n.isDeleted = 0;
`;

// This query gets all the nutritional tables for a particular food item.
const getAllNutrients = (database) => {
  return database.getAllSync(query);
};

export default getAllNutrients;
