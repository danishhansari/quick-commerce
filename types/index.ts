export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  created_at?: Date;
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

export interface OrderData {
  product_id: number;
  qty: number;
  pincode: string;
  address: string;
}

export interface VerifyPayment {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  id: number;
}
