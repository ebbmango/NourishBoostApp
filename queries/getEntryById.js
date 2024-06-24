import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "SELECT * FROM entries WHERE id = $entryId;";

const getEntryById = (database, params) => {
  return database.getFirstSync(query, toSQLiteParameters(params));
};

export default getEntryById;
