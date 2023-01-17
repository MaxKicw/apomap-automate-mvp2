export type updateDriverInput = {
    id: string;
    driverName?: string;
    color?: string;
    vehicles?: string[];
  };
  
  const callUpdateDriver = async (input: updateDriverInput) => {
    const res = await fetch("/api/mutations/Driver/updateDriver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: input.id,
        driverName: input.driverName,
        color: input.color,
        vehicles: input.vehicles,
      
      }),
    });
    return res.json();
  };
  
  export default callUpdateDriver;
  