const query = "SELECT * FROM foods WHERE isDeleted = 0;";

const getFoods = (database) => {
  return database.getAllSync(query);
};

export default getFoods;
