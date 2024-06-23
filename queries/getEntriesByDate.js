import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = `
SELECT entries.*, foods.name as foodName
FROM entries
JOIN foods ON entries.foodId = foods.id
WHERE entries.date = $date;
`;

const getEntriesByDate = (database, params) => {
  return database.getAllSync(query, toSQLiteParameters(params));
};

export default getEntriesByDate;
