// Queries to insert new items in the database.

database.runSync(
  "INSERT INTO foods (id, name, is_deleted) VALUES (3, 'Banana', 0)"
);

database.runSync(
  `INSERT INTO food_nutri_table (food_id, unit_id, base_measure, calories, protein, carbs, fats)
  VALUES (3, 1, 100, 89, 1.09, 22.84, 0.33)`
);