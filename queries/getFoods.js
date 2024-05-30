const getFoodsQuery = `
SELECT 
    f.id,
    f.name,
    f.is_deleted,
    nt.base_measure,
    nt.calories,
    nt.protein,
    nt.carbs,
    nt.fats,
    u.unit
FROM 
    foods f
JOIN 
    food_nutri_table nt ON f.id = nt.food_id
JOIN 
    units u ON nt.unit_id = u.id
`;

export default getFoodsQuery;
