export interface Product {
  map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  brand: string;
  quantityInStock?: number;
}


export interface ProductParams{
  orderBy: string;
  searchTerm?: string;
  types: string[];
  brands: string[];
  pageNumber: number;
  pageSize: number;
}