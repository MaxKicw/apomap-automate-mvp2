const callGetDriver = async (id: string) => {
    const res = await fetch("/api/querys/Driver/getDriver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return res.json();
  };
  
  export default callGetDriver;
  