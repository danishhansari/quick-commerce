export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface Inventories {
  id: number;
  sku: string;
  warehouse: string;
  product: string;
}

export interface Warehouses {
  id: number;
  name: string;
  pincode: string;
}

export interface DeliveryPerson {
  id: number;
  name: string;
  phone: string;
  warehouse: string;
}
