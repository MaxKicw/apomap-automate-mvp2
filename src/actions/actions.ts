export type scheduleTaskInput = {
    id: string;
    status: string;
    time: string
  };
  
export const scheduleTask = async (input: scheduleTaskInput) => {
    const res = await fetch("/api/mutations/scheduleTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: input.id,
        status: input.status,
        time: input.time
      }),
    });
    return res.json();
  };
  
