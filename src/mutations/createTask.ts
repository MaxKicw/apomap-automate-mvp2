export type createTaskInput = {
  name: string;
  lat: number;
  lon: number;
};

const createTask = async (input: createTaskInput) => {
  const res = await fetch("/api/mutations/createTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: input.name, lat: input.lat, lon: input.lon }),
  });
  return res.json();
};

export default createTask;
