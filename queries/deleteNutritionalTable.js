const query = "DELETE FROM foodNutritionalTables WHERE id = $tableId;";

export default function deleteNutritionalTable(database, { tableId }) {
  return database.runSync(query, { $tableId: tableId });
}
