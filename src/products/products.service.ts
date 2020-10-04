import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number): Promise<Product> {
        const newProduct = this.productModel(new Product("", title, desc, price));
        return await newProduct.save();
        /* const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId; */
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find()
    }

    getProduct(id: string): Promise<Product> {
        return this.findProduct(id);
    }

    async updateProduct(id: string, title: string, desc: string, price: number) {
        const product = await this.findProduct(id);
        if (title) {
            product.title = title;
        }
        if (desc) {
            product.description = desc;
        }
        if (price) {
            product.price = price;
        }
        return await this.productModel.findByIdAndUpdate(id, product, { new: true });
    }

    async deleteProduct(id: string): Promise<Product> {
        return await this.productModel.findByIdAndRemove(id);

    }

    private async findProduct(id: string): Promise<Product> {
        return await this.productModel.findOne({ _id: id });
    }
}