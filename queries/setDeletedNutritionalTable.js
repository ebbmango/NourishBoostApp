import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
UPDATE nutrients SET
WHERE id = $nutrientsId;
`;

const setDeletedNutrients = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default setDeletedNutrients;
