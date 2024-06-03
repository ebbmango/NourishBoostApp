export default function validateNutrients({ calories, carbs, fats, protein }) {
  // Ensures that no nutrients have been input if the total calories are zero.
  if (calories === 0 && (carbs !== 0 || fats !== 0 || protein !== 0)) {
    return false;
  }

  // Calculates expected calories from macronutrients.
  const expectedCalories = carbs * 4 + protein * 4 + fats * 9;

  // Sets a margin of error (10% of the expected calories).
  const marginOfError = expectedCalories * 0.1;

  // Checks if the provided calories match the expected calories (given the margin of error).
  if (Math.abs(calories - expectedCalories) > marginOfError) {
    return false;
  }

  // If all checks have passed:
  return true;
}
