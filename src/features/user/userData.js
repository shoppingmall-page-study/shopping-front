import { useState } from "react";
import { cartGet, userGet } from "../../Api/ApiService";

const MODIFY_USERDATA = 'userData/MODIFY_USERDATA';
const INIT_USERDATA = 'userData/INIT_USERDATA';

export const modifyUserData = (data) => ({data: data, type:MODIFY_USERDATA});
export const initUserData = () => ({type:INIT_USERDATA});
const initialState= {
    id: "",
    nickname: "",
    age: "",
    address: "",
}

export default function userData(state = initialState, action){
    switch(action.type){
        case MODIFY_USERDATA:
            return{...action.data};
        case INIT_USERDATA:
            return initialState;
            default:
                return state;
    }
}