const query = "SELECT * FROM units;";

export default function getUnits(database) {
  return database.getAllSync(query);
}
