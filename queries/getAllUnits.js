const query = "SELECT * FROM units;";

const getAllUnits = (database) => {
  return database.getAllSync(query);
};

export default getAllUnits;
