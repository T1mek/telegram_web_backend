import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.serice';
import {validate} from "class-validator";

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Body() productData: CreateProductDto,
    @UploadedFiles() files,
  ): Promise<Product> {
    const newProduct = await this.productService.createProduct(productData);
    const images = await this.fileService.uploadFiles(files, newProduct.name);
    newProduct.images = images;

    return this.productService.updateProduct(newProduct);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: number): Promise<void> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productService.deleteProductById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProductById(
    @Param('id') id: number,
    @Body() productData: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await this.productService.updateProductById(
      id,
      productData,
    );
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }
}
