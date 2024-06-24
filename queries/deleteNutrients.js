// Functions
import toSQLiteParameters from "../functions/toSQLiteParameters";

// Queries
import getEntriesByNutrients from "./getEntriesByNutrients";
import setDeletedNutrients from "./setDeletedNutritionalTable";

const query = "DELETE FROM nutrients WHERE id = $nutrientsId;";

// This functions handles nutrients deletion from the database.
const deleteNutrients = (database, params) => {
  // If no entry references this nutritional table...
  if (getEntriesByNutrients(database, params).length === 0)
    // It is simply deleted.
    return database.runSync(query, toSQLiteParameters(params));
  // Else...
  else {
    // We flag it as "deleted" in the database.
    setDeletedNutrients(database, params);
  }
};

export default deleteNutrients;
