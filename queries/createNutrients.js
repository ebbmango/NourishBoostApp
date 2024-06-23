import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
INSERT INTO nutrients
(foodId, unitId, baseMeasure, kcals, protein, carbs, fats)
VALUES (
  $foodId,
  $unitId,
  $baseMeasure,
  $kcals,
  $protein,
  $carbs,
  $fats
);`;

const createNutrients = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createNutrients;
