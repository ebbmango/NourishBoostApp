import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
SELECT units.id, units.symbol
FROM foods
JOIN nutrients ON foods.id = nutrients.foodId
JOIN units ON nutrients.unitId = units.id
WHERE foods.id = $foodId AND nutrients.isDeleted = 0;
`;

const getUnitsByFood = (database, params) => {
  return database.getAllSync(query, toSQLiteParameters(params));
};

export default getUnitsByFood;
