const query = "SELECT * FROM meals;";

const getMeals = (database) => {
  return database.getAllSync(query);
};

export default getMeals;
