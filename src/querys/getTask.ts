const getTask = async (key: string, id: string) => {
  const res = await fetch("/api/querys/getTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export default getTask;
