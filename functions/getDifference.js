// This function gets the difference between two arrays of objects.
export default function getDifference(arr1, arr2) {
  return arr1.filter((obj1) => !arr2.some((obj2) => obj1.id === obj2.id));
}
