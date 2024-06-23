import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
SELECT units.id, units.symbol
FROM units
LEFT JOIN nutrients ON units.id = nutrients.unitId AND nutrients.foodId = $foodId
WHERE nutrients.unitId IS NULL;
`;

const getAvailableUnits = (database, params) => {
  return database.getAllSync(query, toSQLiteParameters(params));
};

export default getAvailableUnits;
