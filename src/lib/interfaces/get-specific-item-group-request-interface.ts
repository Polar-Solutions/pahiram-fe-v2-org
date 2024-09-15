import { IItem, IItemGroup } from "../interfaces";


export interface ISpecificItemGroupApiResponse {
  status: boolean; // Status of the response, e.g., true
  data?: IItemGroup; // Data object containing item and date details
  error?: any;
  method: string; // HTTP method used, e.g., "GET"
}
