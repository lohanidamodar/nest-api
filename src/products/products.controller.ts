import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { get } from "http";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    addProduct(@Body('title') title: string, @Body('description') desc: string, @Body('price') price: number): Promise<Product> {
        return this.productsService.insertProduct(title, desc, price);
    }

    @Get()
    getProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id: string): Promise<Product> {
        return this.productsService.getProduct(id);
    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') desc: string, @Body('price') price: number) {
        return this.productsService.updateProduct(id, title, desc, price);
    }

    @Delete(':id')
    removeProduct(@Param('id') id: string): Promise<Product> {
        return this.productsService.deleteProduct(id);
    }
}