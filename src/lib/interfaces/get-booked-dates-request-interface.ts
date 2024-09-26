// Interface for the individual date objects
export interface IItemGroupDataForBookedDatesAPI {
  item_model: string;
  active_items: number;
}

export interface IDateInfo {
  start: string; // ISO format date string, e.g., "2025-11-29T15:00"
  end: string; // ISO format date string, e.g., "2025-11-30T16:35"
  count: number; // Reserved count, e.g., 3
  title?: string; // Descriptive title, e.g., "Reserved quantity: 3"
  color?: string;
}

// Interface for the data object containing item details
interface IBookedDatesApiResponseDataValue {
  item_group_data: IItemGroupDataForBookedDatesAPI;
  dates: IDateInfo[]; // Array of date objects
}

// Main interface for the overall response structure
export interface IBookedDatesApiResponse {
  status: boolean; // Status of the response, e.g., true
  data?: IBookedDatesApiResponseDataValue; // Data object containing item and date details
  error?: any;
  method: string; // HTTP method used, e.g., "GET"
}

// Calendar Component Props
export interface ICalendarModal {
  itemGroupId: string;
}
