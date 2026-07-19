export interface CarItem {
  _id?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  images: string[];
  make: string;
  model: string;
  year: number;
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid";
  mileage: number;
  transmission: "manual" | "automatic";
  condition: "new" | "used";
  color: string;
  location: string;
  bodyType?: "sedan" | "suv" | "sports" | "luxury" | "off-road" | "truck";
  sellerId: string;
  status: "available" | "sold" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
