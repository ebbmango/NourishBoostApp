import { useRoute } from "@react-navigation/native";

export default function RegisterItemScreen() {
  const { food, date } = useRoute().params;
  console.log(food, date);
  return (
    <>
      <></>
    </>
  );
}
