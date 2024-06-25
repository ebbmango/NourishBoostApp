export default function proportion(tableMacro, entryAmount, tableAmount) {
  const result = (tableMacro * entryAmount) / tableAmount;
  return isNaN(result) ? 0 : result;
}
