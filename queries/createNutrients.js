import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
INSERT INTO nutrients
(foodId, unitId, baseMeasure, kcals, protein, carbs, fats, isDeleted)
VALUES (
  $foodId,
  $unitId,
  $baseMeasure,
  $kcals,
  $protein,
  $carbs,
  $fats,
  0
);`;

const createNutrients = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default createNutrients;
