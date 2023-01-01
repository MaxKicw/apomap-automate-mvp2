export type updateTaskInput = {
  id: string;
  customerName?: string;
  coords?: { lat: number; lon: number };
};

const updateTask = async (input: updateTaskInput) => {
  const res = await fetch("/api/mutations/updateTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: input.id,
      customerName: input.customerName,
      coords: input.coords,
    }),
  });
  return res.json();
};

export default updateTask;
