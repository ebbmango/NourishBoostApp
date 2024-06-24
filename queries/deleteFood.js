// Functions
import toSQLiteParameters from "../functions/toSQLiteParameters";

// Queries
import getEntriesByFood from "./getEntriesByFood";
import getNutrientsByFood from "./getNutrientsByFood";
import setDeletedFood from "./setDeletedFood";
import setDeletedNutrients from "./setDeletedNutritionalTable";

const query = "DELETE FROM foods WHERE id = $foodId;";

// This function handles food deletion from the database.
const deleteFood = (database, params) => {
  // If this food belongs to no entry...
  if (getEntriesByFood(database, params).length === 0)
    // It is simply deleted.
    return database.runSync(query, toSQLiteParameters(params));
  // Else...
  else {
    // We flag it as "deleted" in the database.
    setDeletedFood(database, params);
    // And do the same for each of its nutritional tables.
    getNutrientsByFood(database, params).forEach((nutrients) => {
      setDeletedNutrients(database, { nutrientsId: nutrients.id });
    });
  }
};

export default deleteFood;
