import axios from "axios";

const url = "/Data/products.json";
//서버 작동 시
//const url = "/product/create"

function getProducts(){
    const res = axios(url);
    return res;
}

//서버 작동 시
// function getProducts(){
//     const res = axios(url);
//     return res;
// }

export default getProducts;