import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { get } from "http";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    addProduct(@Body('title') title: string, @Body('description') desc: string, @Body('price') price: number): any {
        const id = this.productsService.insertProduct(title, desc, price);
        return { id: id };
    }

    @Get()
    getProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id);
    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') desc: string, @Body('price') price: number) {
        this.productsService.updateProduct(id,title,desc,price);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') id:string) {
        this.productsService.deleteProduct(id);
        return null;
    }
}