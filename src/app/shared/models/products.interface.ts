export interface AddProductInterface {
  title: string;
  price: number;
  category: string;
  description: string;
  image: any;
}

export interface UpdateProductInterface {
  id: string | undefined;
  title: string;
  price: number;
  category: string;
  description: string;
  image: any;
}

export interface GetProductInterface {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: any;
  rating: { rate: number; count: number };
}
