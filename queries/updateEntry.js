const query =
  "UPDATE entries SET unitId = $unitId, amount = $amount WHERE id = $entryId;";

export default function updateEntry(database, { unitId, amount, entryId }) {
  return database.runSync(query, {
    $unitId: unitId,
    $amount: amount,
    $entryId: entryId,
  });
}
