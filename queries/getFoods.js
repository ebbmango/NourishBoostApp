const query = "SELECT * FROM foods;";

const getFoods = (database) => {
  return database.getAllSync(query);
};

export default getFoods;
