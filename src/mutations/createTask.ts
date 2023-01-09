export type createTaskInput = {
  customerName: string;
  lat: number;
  lon: number;
  scheduleStatus?: string;
  autoTimeScheduled?: Date
};

const createTask = async (input: createTaskInput) => {
  const res = await fetch("/api/mutations/createTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: input.customerName,
      lat: input.lat,
      lon: input.lon,
      status: input.scheduleStatus ? input.scheduleStatus : "unassigned",
      autoTimeScheduled: input.autoTimeScheduled
    }),
  });
  return res.json();
};

export default createTask;
