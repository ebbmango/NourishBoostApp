const getNutriTablesQuery = (food_id) => {
  return `
    SELECT *
    FROM food_nutri_table nt
    JOIN units u ON nt.unit_id = u.id
    WHERE nt.food_id = ${food_id};
    `;
};

export default getNutriTablesQuery;
// JOIN
//     units u ON nt.unit_id = u.id
