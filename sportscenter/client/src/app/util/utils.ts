import { Basket } from "../models/basket";


export function getBasketFromLocalStorage():Basket | null {
    const storedBasket = localStorage.getItem('basket');
    if(storedBasket){
        try {
            const parsedbasket : Basket = JSON.parse(storedBasket);
            return parsedbasket;
        } catch (error) {
            console.error('Error Parsing basket from local storage : ', error);
            
        }
    }
    return null;
}