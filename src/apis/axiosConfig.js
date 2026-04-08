import axios from 'axios';
import { APIService } from './Service';
import { LocalStorage, LocalStorageGet } from '../utility/LocalStorage';
import { SecretKeyToken, BASE_URL } from '@env';
import { secreteKeyToken } from './request';

console.log('SecretKeyToken:::::::::::::::::', SecretKeyToken);
console.log('BASE_URL:::::::::::::::::', BASE_URL);

const instance = axios.create({
    baseURL: BASE_URL,
});

// instance.interceptors.request.use(
//     async (config) => {
//         console.log('baseURL:::::::::::::::::', baseURL);
//         // Add the "Content-Type" header with the value "application/json" to the request.
//         const token = await LocalStorage.get('token');
//         console.log("token==>", token);
//         config.headers['Content-Type'] = 'application/json';
//         config.headers['Authorization'] = `Bearer ${token}`
//         // config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTZWNyZXRLZXkiOiJtMzg0OGUwYTQzMjk2Yzc5ZDVlMjEyZGJkOTBjZGM0YjNiMmNkZGVkYjhiNTc0M2RmODdlZjBjYjViOGIyMTY3YTU2N2FhNmU2ZjE4NmJkZDkzMWUzMzgwMWYxNGQ3N2FmZTAzMjczMWIyOTdiODgwYTg4OTFkYjVjZGUyMTc0MCIsIkFwaU5hbWUiOiJaZW5wbHVzTW9iaWxlQXBpTmFtZSIsIlVJRCI6IjA3OTc3MGFlNWRmOTRjOTU4MzZjNTcyOTRjMmZiMmFkIiwibmJmIjoxNzE0MTA2NTU1LCJleHAiOjE3MTQxMDgzNTUsImlhdCI6MTcxNDEwNjU1NX0.lCCbJwG34Cqhc8Ik-cF0rIoym9XVCKKR6W5ckEJn1X0`
//         // console.log({ config });
//         return config;
//     },
//     (error) => {
//         console.log("errorr-instance==>", error);
//         console.log('baseURL:::::::::::::::::', baseURL);


//         return Promise.reject(error);
//     }
// );

instance.interceptors.request.use(
    async (config) => {
        const token = await LocalStorage.get('token');

        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${token}`;

        // 🔥 FULL REQUEST LOG
        console.log('🚀 API REQUEST ----------------');
        console.log('URL:', `${BASE_URL}${config.url}`);
        console.log('METHOD:', config.method?.toUpperCase());
        console.log('HEADERS:', config.headers);
        console.log('PARAMS:', config.params);
        console.log('BODY:', config.data);
        console.log('--------------------------------');

        return config;
    },
    (error) => {
        console.log('❌ REQUEST ERROR:', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        console.log('BASE_URL:::::::::::::::::', BASE_URL);

        return response;
    },
    (error) => {
        console.log('BASE_URL:::::::::::::::::', BASE_URL);
        console.log("error-response==>", error);
        if (error?.response?.status === 401) {
            // Alert.alert('Alert', "Unauthorized, Try Again", [
            //   {
            //     text: 'OK',
            //     onPress: () => APIService.secreteKeyToken()
            //   },
            // ]);
            // APIService.secreteKeyToken()
            secreteKeyToken()
        }

        return Promise.reject(error);
    }
)

export default instance;
