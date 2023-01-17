export type deleteDriverInput = {
    id: string;
  };
  
  const callDeleteDriver = async (input: deleteDriverInput) => {
    const res = await fetch("/api/mutations/Driver/deleteDriver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: input.id }),
    });
    return res.json();
  };
  
  export default callDeleteDriver;
  