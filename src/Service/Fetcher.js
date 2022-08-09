import axios from "axios";

const url = "/Data/products.json";

function getProducts(){
    const res = axios(url);
    return res;
}

export default getProducts;