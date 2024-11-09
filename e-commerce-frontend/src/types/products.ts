export type TProducts = {
    id:number;
    title:string;
    price:number,
    cat_prifix?:string;
    img:string;
    quanitiy?:number;
    max:number;
    isLiked?:boolean;
    isAuthenticated?:boolean;
}