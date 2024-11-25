import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import {
  AddProductInterface,
  GetProductInterface,
  UpdateProductInterface,
} from '../models/products.interface';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addProduct with correct payload', () => {
    const mockProduct: AddProductInterface = {
      title: 'Test Product',
      price: 100,
      category: 'Test Category',
      description: 'Test Description',
      image: 'test-image.jpg',
    };

    service.addProduct(mockProduct).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should call getAllProducts and return the product list', () => {
    const mockProducts: GetProductInterface[] = [
      {
        id: '1',
        title: 'Product 1',
        price: 50,
        category: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 10 },
      },
    ];

    service.getAllProducts().subscribe((response) => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should call updateProduct with correct payload', () => {
    const mockProduct: UpdateProductInterface = {
      id: '1',
      title: 'Updated Product',
      price: 150,
      category: 'Updated Category',
      description: 'Updated Description',
      image: 'updated-image.jpg',
    };

    service.updateProduct(mockProduct).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(
      'https://fakestoreapi.com/products/' + mockProduct.id
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should call deleteProduct with correct id', () => {
    const mockId = '1';

    service.deleteProduct(mockId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(
      'https://fakestoreapi.com/products/' + mockId
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should call getLimitedProducts with correct count', () => {
    const mockCount = 5;
    const mockProducts: GetProductInterface[] = [
      {
        id: '1',
        title: 'Product 1',
        price: 50,
        category: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 10 },
      },
    ];

    service.getLimitedProducts(mockCount).subscribe((response) => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(
      'https://fakestoreapi.com/products?limit=' + mockCount
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
