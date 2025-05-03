import { Stack } from "expo-router";
import { BabyProvider } from "../src/context/BabyContext";

export default function Layout() {
  return (
    <BabyProvider>
      <Stack />
    </BabyProvider>
  );
}