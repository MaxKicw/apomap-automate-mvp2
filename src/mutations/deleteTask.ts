export type deleteTaskInput = {
  id: string;
};

const deleteTask = async (input: deleteTaskInput) => {
  const res = await fetch("/api/mutations/deleteTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: input.id }),
  });
  return res.json();
};

export default deleteTask;
