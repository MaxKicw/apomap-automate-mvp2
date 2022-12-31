export interface Store {
  number: number;
  increase: (input: number) => void;
  decrease: (input: number) => void;
}
