const query = "SELECT * FROM units;";

export default function getAllUnits(database) {
  return database.getAllSync(query);
}
