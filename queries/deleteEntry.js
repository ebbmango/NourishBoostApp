const query = "DELETE FROM entries WHERE id = $entryId;";

export default function deleteEntry(database, { entryId }) {
  return database.runSync(query, { $entryId: entryId });
}
