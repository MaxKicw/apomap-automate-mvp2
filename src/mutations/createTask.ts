export type createTaskInput = {
  customerName: string;
  customer_mail: string;
  customer_mobile: string;
  customer_phone: string;
  task_address: string;
  task_date: string;
  task_note: string;
  task_open_amount: string;
  task_priority: string;
  task_tags: string[];
  task_type: string;
  scheduleStatus?: string;
  autoTimeScheduled?: Date
};

const createTask = async (input: createTaskInput) => {

    const res = await fetch("/api/mutations/createTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      customerName: input.customerName,
      customer_mail: input.customer_mail,
      customer_mobile: input.customer_mobile,
      customer_phone: input.customer_phone,
      task_address: input.task_address,
      task_date: input.task_date,
      task_note: input.task_note,
      task_open_amount: input.task_open_amount,
      task_priority: input.task_priority,
      task_tags: input.task_tags,
      task_type: input.task_type,
      task_status: "unassigned",
      status: input.scheduleStatus ? input.scheduleStatus : "unassigned",
      autoTimeScheduled: input.autoTimeScheduled
      }),
    });
    return res.json();
 
};

export default createTask;


