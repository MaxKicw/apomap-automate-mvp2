export interface Task {
  id: string;
  customerName: string;
  owner: string;
  coords: { lat: number; lon: number };
}
