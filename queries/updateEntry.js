import toSQLiteParameters from "../functions/toSQLiteParameters";

const query =
  "UPDATE entries SET unitId = $unitId, amount = $amount WHERE id = $entryId;";

export default function updateEntry(database, params) {
  return database.runSync(query, toSQLiteParameters(params));
}
