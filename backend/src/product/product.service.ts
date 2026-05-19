import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private idCounter = 1;

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.idCounter++,
      ...createProductDto,
    };
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((product) => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    if (product) {
      Object.assign(product, updateProductDto);
    }
    return product;
  }

  remove(id: number): void {
    const index = this.products.findIndex((product) => product.id === id);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }
}
