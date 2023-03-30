// export interface Task {
//   id: string;
//   customerName: string;
//   owner: string;
//   coords: { lat: number; lon: number };
//   createdAt: string;
//   updatedAt?: string;
//   status: string;
// }



export type Task = {
  id: string;
  updatedAt?: string;
  customerName: string;
  customer_mail?: string;
  customer_mobile?: string;
  customer_phone?: string;
  task_address: string;
  task_created: string;
  task_job_no: string;
  task_latest: string;
  task_note: string;
  task_open_amount: string;
  task_origin: string;
  task_owner: string;
  task_priority?: string;
  task_source: "ADG S3000" | string;
  task_status: string,
  task_tags: string[];
  task_type: string;
  task_date: string; 
};




