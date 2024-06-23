import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
INSERT INTO entries (foodId, date, amount, unitId, mealId, nutrientsId)
VALUES ($foodId, $date, $amount, $unitId, $mealId, $nutrientsId);
`;

const createFoodEntry = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createFoodEntry;
