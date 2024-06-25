-- MEALS
CREATE TABLE IF NOT EXISTS "meals" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "name" TEXT,
  "isDeleted" INTEGER
);
-- FOODS
CREATE TABLE IF NOT EXISTS "foods" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "name" TEXT,
  "type" TEXT CHECK(type IN ('food', 'recipe')),
  "isDeleted" INTEGER
);
-- RECIPE'S INGREDIENTS
CREATE TABLE IF NOT EXISTS "ingredients" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "recipeId" INTEGER,
  "nutrientsId" INTEGER,
  "amount" REAL,
  -- One recipe can have multiple ingredients and a single ingredient can appear in many recipes.
  FOREIGN KEY ("recipeId") REFERENCES "foods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("nutrientsId") REFERENCES "nutrients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
-- MEASUREMENT UNITS
CREATE TABLE IF NOT EXISTS "units" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "symbol" TEXT
);
-- NUTRITIONAL TABLES
CREATE TABLE IF NOT EXISTS "nutrients" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "foodId" INTEGER,
  "unitId" INTEGER,
  "baseMeasure" REAL,
  "kcals" REAL,
  "carbs" REAL,
  "fats" REAL,
  "protein" REAL,
  "isDeleted" INTEGER,
  -- A (food's) nutritional table belongs to a food. One food can have many nutritional tables.
  FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  -- A (food's) nutritional table "belongs" to a unit. One unit can have many nutritional tables.
  FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
-- ENTRIES
CREATE TABLE IF NOT EXISTS "entries" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "foodId" INTEGER,
  "nutrientsId" INTEGER,
  "date" TEXT,
  "amount" REAL,
  "unitId" INTEGER,
  "mealId" INTEGER,
  -- An entry belongs to a meal. One meal can have many entries.
  FOREIGN KEY ("mealId") REFERENCES "meals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  -- An entry belongs to a food. One food can have many entries.
  FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  -- An entry belongs to a nutritional table. One nutritional table can have many entries.
  FOREIGN KEY ("nutrientsId") REFERENCES "nutrients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
-- WEIGHTINGS
CREATE TABLE IF NOT EXISTS "weightings" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "date" TEXT,
  "weight" REAL
);
-- Inserts initial ("out-of-the-box") units.
INSERT INTO units (symbol)
VALUES ('g'),
  ('ml'),
  ('lb'),
  ('tsp'),
  ('tbsp'),
  ('cup'),
  ('oz');
-- Inserts initial ("out-of-the-box") meals.
INSERT INTO meals (name, isDeleted)
VALUES ('breakfast', 0),
  ('morning snack', 0),
  ('lunch', 0),
  ('afternoon snack', 0),
  ('dinner', 0);
-- Inserts initial foods (for ease of development only - DELETE FOR PRODUCTION)
INSERT INTO foods (id, name, type, isDeleted)
VALUES (1, 'Milk', 'food', 0),
  (2, 'Egg', 'food', 0),
  (3, 'Banana', 'food', 0);
-- Inserts initial nutritional tables (for ease of development only - DELETE FOR PRODUCTION)
INSERT INTO nutrients (
    foodId,
    unitId,
    baseMeasure,
    kcals,
    carbs,
    fats,
    protein,
    isDeleted
  )
VALUES -- Milk
  (1, 2, 100, 60, 4.7, 3.2, 4.2, 0),
  -- Egg
  (2, 1, 100, 147, 0.77, 9.94, 12.58, 0),
  -- Banana
  (3, 1, 100, 89, 22.84, 0.33, 1.09, 0);