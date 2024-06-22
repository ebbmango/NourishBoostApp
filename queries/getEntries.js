const query = `
SELECT entries.*, foods.name as foodName
FROM entries
JOIN foods ON entries.foodId = foods.id
WHERE entries.date = $date;
`;

export default function getEntries(database, { date }) {
  return database.getAllSync(query, {
    $date: date,
  });
}
