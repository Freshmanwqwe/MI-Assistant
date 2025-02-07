import axios from "axios";
import { sys_msg_addcat } from "./prompts";

export async function testAPI(data){
    var res = "";
    await axios({
        url:data.apiURL,
        method:'POST',
        data: {
            ...data.request
        },
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + data.apiKEY
        }
    })
    .then(function (response) {
        res = response.data.choices[0].message.content;
    })
    .catch(function (error) {
        const errs = error.response.data.error
        res = error.status + '\n' + errs.code + ' ' + errs.message;
    });
    return res
}


export async function AddCatChat(data){
    var res = "";
    const req = {
        model : data.request.model,
        messages : [sys_msg_addcat, ...data.request.messages]
    }

    await axios({
        url:data.apiURL,
        method:'POST',
        data: {
            ...req
        },
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + data.apiKEY
        }
    })
    .then(function (response) {
        res = response.data.choices[0].message.content;
    })
    .catch(function (error) {
        const errs = error.response.data.error
        res = error.status + '\n' + errs.code + ' ' + errs.message;
    });
    return res
}