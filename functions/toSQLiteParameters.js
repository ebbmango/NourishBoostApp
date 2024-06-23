const toSQLiteParameters = (dictionary) => {
  const result = {};

  Object.keys(dictionary).forEach((key) => {
    result[`$${key}`] = dictionary[key];
  });

  return result;
};

export default toSQLiteParameters;
