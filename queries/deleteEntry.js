import toSQLiteParameters from "../functions/toSQLiteParameters";

const query = "DELETE FROM entries WHERE id = $entryId;";

const deleteEntry = (database, params) => {
  return database.runSync(query, toSQLiteParameters(params));
};

export default deleteEntry;
