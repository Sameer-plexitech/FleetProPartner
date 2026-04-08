import { SecretKeyToken } from '@env';
import axios from '../apis/axiosConfig'
import { LocalStorage } from '../utility/LocalStorage';

console.log("LocalStorage===>", LocalStorage);

export const secreteKeyToken = async () => {
    let body = {
        SecretKey: SecretKeyToken
    }
    console.log("secreteKeyToken===>", body);
    try {
        const response = await axios.post('/authorize/token', body);
        console.log('secreteKeyToken--->', response.data);
        LocalStorage.set('token', response.data);
        return response;
    } catch (error) {
        console.log('Error secreteKeyToken===>', error);
    }
};

export const authenticateToken = async (body) => {
    console.log("authenticateToken===>", body);
    try {
        const response = await axios.post('/authenticate/token', body);
        console.log('authenticateToken--->', response.data);
        return response;
    } catch (error) {
        console.log('Error authenticateToken===>', error);
    }
};