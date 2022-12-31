import { Button, Text } from "@mantine/core";
import { useStore } from "../src/hooks/useStore";

export default function Home() {
  const store = useStore();
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Text>{store.number}</Text>
      <Button onClick={() => store.increase(1)}>Click me</Button>
    </div>
  );
}
