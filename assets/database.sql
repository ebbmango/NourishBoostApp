CREATE TABLE IF NOT EXISTS "foods" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "name" TEXT,
  "isDeleted" INTEGER
);

CREATE TABLE IF NOT EXISTS "foodNutritionalTables" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "foodId" INTEGER,
  "unitId" INTEGER,
  "baseMeasure" REAL,
  "kcals" REAL,
  "carbs" REAL,
  "fats" REAL,
  "protein" REAL,
  -- A (food's) nutritional table belongs to a food. One food can have many nutritional tables.
  FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  -- A (food's) nutritional table "belongs" to a unit. One unit can have many nutritional tables.
  FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "recipeNutritionalTables" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "recipeId" INTEGER,
  "unitId" INTEGER,
  "baseMeasure" REAL,
  "kcals" REAL,
  "protein" REAL,
  "carbs" REAL,
  "fats" REAL,
  -- A (recipe's) nutritional table belongs to a recipe. One recipe can have many nutritional tables.
  FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  -- A (recipe's) nutritional table "belongs" to a unit. One unit can have many nutritional tables.
  FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "units" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "unit" TEXT
);

CREATE TABLE IF NOT EXISTS "entries" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "foodId" INTEGER,
  "recipeId" INTEGER,
  "date" TEXT,
  "amount" REAL,
  "unitId" INTEGER,
  "mealId" INTEGER,
  -- An entry belongs to a meal. One meal can have many entries.
  FOREIGN KEY ("mealId") REFERENCES "meals" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  -- An entry belongs to a food. One food can have many entries.
  FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  -- An entry belongs to a recipe. One recipe can have many entries.
  FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "meals" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "name" TEXT,
  "isDeleted" INTEGER
);

CREATE TABLE IF NOT EXISTS "weightings" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "date" TEXT,
  "weight" REAL
);

CREATE TABLE IF NOT EXISTS "recipes" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "name" TEXT,
  "isDeleted" INTEGER
);

CREATE TABLE IF NOT EXISTS "recipeIngredients" (
  "id" INTEGER UNIQUE PRIMARY KEY NOT NULL,
  "foodId" INTEGER,
  "recipeId" INTEGER,
  "amount" REAL,
  "unitId" INTEGER,
  -- An ingredient belongs to a recipe. One recipe can have many ingredients.
  FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserts initial ("out-of-the-box") units.
INSERT INTO units (unit)
VALUES
    ('g'),
    ('ml'),
    ('lb'),
    ('tsp'),
    ('tbsp'),
    ('cup'),
    ('oz');
    
-- Inserts initial ("out-of-the-box") meals.
INSERT INTO meals (name, isDeleted)
VALUES
    ('breakfast', 0),
    ('morning snack', 0),
    ('lunch', 0),
    ('afternoon snack', 0),
    ('dinner', 0);

-- Inserts initial foods (for ease of development only - DELETE FOR PRODUCTION)
INSERT INTO foods (id, name) VALUES (1, 'Milk');
INSERT INTO foodNutritionalTables (foodId, unitId, baseMeasure, kcals, carbs, fats, protein)
VALUES (1, 2, 100, 60, 4.7, 3.2, 4.2);

INSERT INTO foods (id, name) VALUES (2, 'Egg');
INSERT INTO foodNutritionalTables (foodId, unitId, baseMeasure, kcals, carbs, fats, protein)
VALUES (2, 1, 100, 147, 0.77, 9.94, 12.58);

INSERT INTO foods (id, name) VALUES (3, 'Banana');
INSERT INTO foodNutritionalTables (foodId, unitId, baseMeasure, kcals, carbs, fats, protein)
VALUES (3, 1, 100, 89, 22.84, 0.33, 1.09);


