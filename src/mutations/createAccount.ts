export type createAccountInput = {
  businessName: string;
};

const createAccount = async (input: createAccountInput) => {
  const res = await fetch("/api/mutations/createAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ businessName: input.businessName }),
  });
  return res.json();
};

export default createAccount;
