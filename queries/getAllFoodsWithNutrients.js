import { useQuery } from "react-query";
import getAllNutrients from "./getAllNutrients";
import getFoods from "./getFoods";

const getAllFoodsWithNutrients = (database) => {
  const foods = getFoods(database);
  const tables = getAllNutrients(database);

  const joinedData = foods.reduce((acc, food) => {
    const foodTables = tables
      .filter((table) => table.foodId === food.id)
      .map((table) => ({
        id: table.id,
        unit: {
          id: table.unitId,
          symbol: table.unitSymbol,
        },
        base: table.base,
        carbs: table.carbs,
        protein: table.protein,
        kcals: table.kcals,
        fats: table.fats,
      }));

    acc.push({
      id: food.id,
      name: food.name,
      tables: foodTables,
    });

    return acc;
  }, []);

  return joinedData;
};

export default getAllFoodsWithNutrients;
