export default function validateNutrition(calories, carbs, fats, protein) {
  // Ensures there are no negative values.
  if (calories < 0 || carbs < 0 || fats < 0 || protein < 0) {
    return -1;
  }

  // Ensures that no nutrients have been input if the total calories are zero.
  if (calories === 0 && (carbs !== 0 || fats !== 0 || protein !== 0)) {
    return 0;
  }

  // Calculates expected calories from macronutrients.
  const expectedCalories = carbs * 4 + protein * 4 + fats * 9;

  // Sets a margin of error (10% of the expected calories).
  const marginOfError = expectedCalories * 0.1;

  // Checks if the provided calories match the expected calories (given the margin of error).
  if (Math.abs(calories - expectedCalories) > marginOfError) {
    return 0;
  }

  // If all checks have passed:
  return 1;
}


/*

Return values:

-1: Unmanageable error! Do not accept.

 0: Manageable error. Prefered approach: not to interfere with the user's freedom.
    Inform them of the issue and allow them to continue if they wish.

 1: All good.

*/