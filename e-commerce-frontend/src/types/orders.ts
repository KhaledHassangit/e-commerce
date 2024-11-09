import { TProducts } from "./products";

export type TorderItem = {
    id:number;
    userId:number;
    subtotal:number;
    items:TProducts[];
}