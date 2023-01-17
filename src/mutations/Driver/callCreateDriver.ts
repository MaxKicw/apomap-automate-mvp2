export type callCreateDriver = {
    driverName: string;
    vehicles: string[];
    employer: string;
    color: string;
  };
  
  const callCreateDriver = async (input: callCreateDriver) => {
  
      const res = await fetch("/api/mutations/Driver/createDriver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            driverName: input.driverName,
            vehicles: input.vehicles,
            employer: input.employer,
            color: input.color
        }),
      });
      return res.json();
      
   
  };
  
  export default callCreateDriver;
  