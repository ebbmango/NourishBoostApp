import toSQLiteParameters from "../functions/toSQLiteParameters";

const query =
  "UPDATE entries SET unitId = $unitId, amount = $amount, nutrientsId = $nutrientsId WHERE id = $entryId;";

export default function updateEntry(database, params) {
  return database.runSync(query, toSQLiteParameters(params));
}
