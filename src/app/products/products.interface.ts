export interface AddProduct {
  title: string;
  price: number;
  category: string;
  description: string;
  image: any;
}

export interface UpdateProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: any;
}

export interface ListProducts {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: any;
  rating: { rate: number; count: number };
}
