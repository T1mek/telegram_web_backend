import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    return this.productRepository.save(productData);
    // const newProduct = new Product();
    // newProduct.id = productData.id;
    // newProduct.name = productData.name;
    // newProduct.images = productData.image;
    // newProduct.price = productData.price;
    // newProduct.quantity = productData.quantity;
    // newProduct.popularity = productData.popularity;
    //
    // return this.productRepository.save(newProduct);
  }
  async updateProduct(productData: CreateProductDto): Promise<Product>{
    return this.productRepository.save(productData);
  }

  async deleteProductById(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProductById(
    id: number,
    productData: Partial<CreateProductDto>,
  ): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.getProductById(id);
  }
}
