import toSQLiteParameters from "../functions/toSQLiteParameters";
import deleteFood from "./deleteFood";
import deleteNutrients from "./deleteNutrients";
import getEntriesByFood from "./getEntriesByFood";
import getEntriesByNutrients from "./getEntriesByNutrients";
import getEntryById from "./getEntryById";
import getFoodById from "./getFoodById";
import getNutrientsById from "./getNutrientsById";

const query = "DELETE FROM entries WHERE id = $entryId;";

const deleteEntry = (database, params) => {
  const { foodId, nutrientsId } = getEntryById(database, params);

  const deletionResult = database.runSync(query, toSQLiteParameters(params));

  const food = getFoodById(database, { foodId });
  const nutrients = getNutrientsById(database, { nutrientsId });

  if (
    food.isDeleted === 1 &&
    getEntriesByFood(database, { foodId }).length === 0
  ) {
    deleteFood(database, { foodId });
  }

  if (
    nutrients.isDeleted === 1 &&
    getEntriesByNutrients(database, { nutrientsId }).length === 0
  ) {
    deleteNutrients(database, { nutrientsId });
  }

  return deletionResult;
};

export default deleteEntry;
