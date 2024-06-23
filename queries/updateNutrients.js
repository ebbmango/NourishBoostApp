import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
UPDATE nutrients SET
baseMeasure = $baseMeasure,
kcals = $kcals,
carbs = $carbs,
fats = $fats,
protein = $protein
WHERE id = $nutrientsId;
`;

const updateNutrients = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default updateNutrients;
