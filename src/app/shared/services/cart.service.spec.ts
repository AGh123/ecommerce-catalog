import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { GetProductInterface } from '../models/products.interface';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product: GetProductInterface = {
      id: '1',
      title: 'Test Product',
      price: 100,
      category: 'Test Category',
      description: 'Test Description',
      image: 'test-image.jpg',
      rating: { rate: 4.5, count: 10 },
    };

    service.addToCart(product);

    const cartProducts = service.getCartProducts();
    expect(cartProducts).toContain(product);
  });

  it('should delete a product from the cart by id', () => {
    const product1: GetProductInterface = {
      id: '1',
      title: 'Product 1',
      price: 50,
      category: 'Category 1',
      description: 'Description 1',
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 10 },
    };

    const product2: GetProductInterface = {
      id: '2',
      title: 'Product 2',
      price: 100,
      category: 'Category 2',
      description: 'Description 2',
      image: 'image2.jpg',
      rating: { rate: 4.8, count: 5 },
    };

    service.addToCart(product1);
    service.addToCart(product2);

    service.deleteCartProduct('1');

    const cartProducts = service.getCartProducts();
    expect(cartProducts).not.toContain(product1);
    expect(cartProducts).toContain(product2);
  });

  it('should return all products in the cart', () => {
    const product: GetProductInterface = {
      id: '1',
      title: 'Test Product',
      price: 100,
      category: 'Test Category',
      description: 'Test Description',
      image: 'test-image.jpg',
      rating: { rate: 4.5, count: 10 },
    };

    service.addToCart(product);

    const cartProducts = service.getCartProducts();
    expect(cartProducts.length).toBe(1);
    expect(cartProducts[0]).toEqual(product);
  });

  it('should clear the cart', () => {
    const product: GetProductInterface = {
      id: '1',
      title: 'Test Product',
      price: 100,
      category: 'Test Category',
      description: 'Test Description',
      image: 'test-image.jpg',
      rating: { rate: 4.5, count: 10 },
    };

    service.addToCart(product);

    service.clearCart();

    const cartProducts = service.getCartProducts();
    expect(cartProducts.length).toBe(0);
  });
});
