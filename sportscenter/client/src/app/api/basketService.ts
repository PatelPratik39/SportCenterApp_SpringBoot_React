import axios from "axios";
import { Basket, BasketItem, BasketTotal } from "../models/basket";
import { Product } from "../models/products";
import { Dispatch } from "@reduxjs/toolkit";
import { setBasket } from "../../feature/basket/basketSlice.ts";
import { createId } from "@paralleldrive/cuid2";

class BasketService {

    apiUrl = "http://localhost:8080/api/cart";

    async getBasketFromAPI() {
        try {
            const response = await axios.get<Basket>(`${this.apiUrl}`);
            return response.data;            
        } catch (error) {
            throw new Error("Failed to retrieve the basket.")
        }
    }

    async getBasket() {
        try {
            const basket = localStorage.getItem('basket');
            if(basket){
                return JSON.parse(basket) as Basket;
            } else {
                throw new Error("Basket not found in local storage");
            }
        } catch (error) {
             throw new Error("Failed to retrieve the basket from local storage : " + error)
        }
    }

    async addItemToBasket(item : Product, quantity = 1 , dispatch:Dispatch) {
        try {
            let basket = this.getCurrentBasket();
            if(!basket) {
                basket = await this.createBasket();
            }
            const itemToAdd = this.mapProductToBasket(item);
            basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
            this.setBasket(basket, dispatch);
            // Calculate Total
            const total = this.calculateTotal(basket);
            return {basket, total};
        } catch (error) {
            throw new Error("Failed to ADD an Item to the basket : " + error)
        }
    }

    async setBasket(basket: Basket, dispatch: Dispatch){
        try{
            await axios.post<Basket>(this.apiUrl, basket);
            localStorage.setItem('basket', JSON.stringify(basket));
            dispatch(setBasket(basket));
        }catch(error){
            throw new Error("Failed to update basket.")
        }
    }

    private getCurrentBasket() {
        const basket = localStorage.getItem('basket');
        return basket ? JSON.parse(basket) as Basket : null;
    }

    private async createBasket(): Promise<Basket>{
        try{
            const newBasket: Basket = {
                // id:"admin123",
                id: createId(),
                items: []
            }
            localStorage.setItem('basket_id', newBasket.id);
            return newBasket;
        }catch(error){
            throw new Error("Failed to create Basket.");
        }
    }
    // Remove item from basket
    async remove(itemId: number, dispatch: Dispatch){
        const basket = this.getCurrentBasket();
        if(basket){
            const itemIndex = basket.items.findIndex((p)=>p.id === itemId);
            if(itemIndex !== -1){
                basket.items.splice(itemIndex, 1);
                this.setBasket(basket, dispatch);
            }
            //check if basket is empty after removing the item
            if(basket.items.length === 0){
                //clear the the basket from the local storage
                localStorage.removeItem('basket_id');
                localStorage.removeItem('basket');
            }
        }
    }

    // Delete basket

     async deleteBasket(basketId: string):Promise<void>{
        try{
            await axios.delete(`${this.apiUrl}/${basketId}`);
        }catch(error){
            throw new Error("Failed to delete the basket.")
        }
    }
// Increament Qunatity from the cart
    async incrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
        const basket = this.getCurrentBasket();
        if(basket){
            const item = basket.items.find((p)=>p.id === itemId);
            if(item){
                item.quantity += quantity;
                if(item.quantity < 1){
                    item.quantity = 1;
                }
                this.setBasket(basket, dispatch);
            }
        }
    }

    // Decrement Qunatity inside cart
     async decrementItemQuantity(itemId: number, quantity:number = 1, dispatch: Dispatch){
        const basket = this.getCurrentBasket();
        if(basket){
            const item = basket.items.find((p)=>p.id === itemId);
            if(item && item.quantity > 1){
                item.quantity -= quantity;
                this.setBasket(basket, dispatch);
            }
        }
    }

    private mapProductToBasket(item: Product): BasketItem {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            quantity: 0,
            pictureUrl: item.pictureUrl,
            productBrand: item.productBrand,
            productType: item.productType
        };
    }

    private upsertItems(items: BasketItem[], itemTotAdd: BasketItem, quantity: number): BasketItem[]{
        const existingItem = items.find(x=>x.id == itemTotAdd.id);
        if(existingItem){
            existingItem.quantity += quantity;
        }else{
            itemTotAdd.quantity = quantity;
            items.push(itemTotAdd);
        }
        return items;
    }
    private calculateTotal(basket: Basket):BasketTotal{
        const shipping = 0;
        const subTotal = basket.items.reduce((acc, item)=>acc+(item.price*item.quantity), 0);
        const total = shipping + subTotal;
        return { shipping, subTotal, total};
    }

}

export default new BasketService();