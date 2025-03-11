import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRef } from 'react';

export const toastRef = createRef()
const getAuth = async () => {
    let token = await AsyncStorage.getItem('user')
    if (token) {
        let userData = JSON.parse(token)
        return userData['access_token']
    }
    return null
}

// export const BASE_URL = "http://103.154.2.115"

// export const API = `${BASE_URL}/~newtaxibooking/api/`;
export const API = "https://myriders.co.za/api/";

export const statusMessage = {
    400: 'Invalid request format.',
    401: 'Unauthorized,please login again.',
    403: 'The request is forbidden.',
    404: 'The specified resource could not be found.',
    405: 'You tried to access the resource with an invalid method.',
    500: 'We had a problem with our server. Try again later.',
    503: "We're temporarily offline for maintenance. Please try again later.",
};

export const getToken = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    print(token);
    return JSON.parse(token);
};

export const authStatus = async () => {
    const auth = await AsyncStorage.getItem('isAuth');
    print(auth);
    return auth;
};

export const getUserData = async (field = null) => {
    const userDataRes = await AsyncStorage.getItem('user');
    if (!field) {
        return JSON.parse(userDataRes);
    } else {
        const userData = JSON.parse(userDataRes);
        return userData[field];
    }
};

export const Toast = (msg, type = 'normal', config) => {
    toastRef.current?.show(msg, { type, ...config })
}
const responseBack = (data, msg, status) => {
    return {
        data,
        msg,
        status,
    };
};
export const logoutHandler = async () => {
    try {
        await AsyncStorage.removeItem('isAuth');
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('TOKEN');
        await AsyncStorage.removeItem('userType');

        return Toast('Logged out successfully');
    } catch (error) {
        console.log(error);
    }
};

const print = (e, l) => {
    console.log(e, l);
}
const printAPIDetails = (token, url, body) => {
    // print every api data on console for test purpose you can comment in live build
    print('TOKEN : ', token);
    print('URL : ', url);
    print('BODY : ', body);
    return;
};

export const GET = async (
    route,
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        Toast('Check Network, Try Again.');
    },
    headers = {}
) => {
    try {
        console.log('NO TOKEN', route);
        const res = await fetch(route, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

                ...headers
                // 'Accept-Language': strings.getLanguage(),
            },
        });
        console.log(res);
        if (res.status === 401 || res.status === 403 || res.status === 422) {
            // EventRegister.emit('updateIsAuth')
            // Toast(`${statusMessage[res.status]}`)
            onError({ data: null, message: statusMessage[res.status], status: 'error' });
            return;
        }

        if (res.status !== 200) {
            const resText = await res.json();
            console.log(resText);
            onError(resText);
            // onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }

        const resJSON = await res.json();
        console.log('resJSON-----', resJSON);
        if (resJSON.status === 1) {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};

export const POST = async (
    route,
    body = {},
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        Toast('Check Network, Try Again.');
    },
    headers = {}
) => {
    try {
        console.log('NO TOKEN', route, body);
        const res = await fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

                ...headers
                // 'Accept-Language': strings.getLanguage(),
            },
            body: JSON.stringify(body),
        });
        console.log(res);
        if (res.status === 401 || res.status === 403 || res.status === 422) {
            // EventRegister.emit('updateIsAuth')
            // Toast(`${statusMessage[res.status]}`)
            var msgData = statusMessage[res.status]
            if (!msgData) {
                msgData = await res.json()
            } else {
                msgData = { data: null, message: statusMessage[res.status], status: 'error' }
            }
            onError(msgData);
            return;
        }

        if (res.status !== 200) {
            const resText = await res.json();
            console.log(resText);
            onError(resText);
            // onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }

        const resJSON = await res.json();
        console.log('resJSON-----', resJSON);
        if (resJSON.status === 1) {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
export const POST_WITH_TOKEN = async (
    route,
    body = {},
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        Toast('Check Network, Try Again.');
    },
    headers = {}
) => {
    console.warn('postwith', route,
        body)
    try {
        var token = await AsyncStorage.getItem("TOKEN")
        console.log(token);
        console.log('NO TOKEN', route, body);
        const res = await fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`,

                ...headers
                // 'Accept-Language': strings.getLanguage(),
            },
            body: JSON.stringify(body),
        });
        console.log('HKDLHKHFKHDKFHKAHDKHFAKH', res);
        if (res.status === 401 || res.status === 403 || res.status === 422) {
            // EventRegister.emit('updateIsAuth')
            // Toast(`${statusMessage[res.status]}`)
            var msgData = statusMessage[res.status]
            if (!msgData) {
                msgData = await res.json()
            } else {
                msgData = { data: null, message: statusMessage[res.status], status: 'error' }
            }
            onError(msgData);
            return;
        }

        if (res.status !== 200) {
            const resText = await res.json();
            console.log(resText);
            onError(resText);
            // onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }

        const resJSON = await res.json();
        console.log('resJSON-----', resJSON);
        if (resJSON.status === 1) {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};

export const GET_WITH_TOKEN = async (
    route,

    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        Toast('Check Network, Try Again.');
    },
    headers = {}
) => {
    try {
        var token = await AsyncStorage.getItem("TOKEN")
        console.log('NO TOKEN', token);
        const res = await fetch(route, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`,

                ...headers
                // 'Accept-Language': strings.getLanguage(),
            },

        });
        console.log(res);
        if (res.status === 401 || res.status === 403 || res.status === 422) {
            // EventRegister.emit('updateIsAuth')
            // Toast(`${statusMessage[res.status]}`)
            var msgData = statusMessage[res.status]
            if (!msgData) {
                msgData = await res.json()
            } else {
                msgData = { data: null, message: statusMessage[res.status], status: 'error' }
            }
            onError(msgData);
            return;
        }

        if (res.status !== 200) {
            const resText = await res.json();
            console.log(resText);
            onError(resText);
            // onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }

        const resJSON = await res.json();
        console.log('resJSON-----', resJSON);
        if (resJSON.status === 1) {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
export const POST_WITH_TOKEN_FORMDATA = async (
    route,
    body = {},
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        Toast('Check Network, Try Again.');
    },
    headers = {}
) => {
    try {
        var token = await AsyncStorage.getItem("TOKEN")
        console.log('NO TOKEN', token);

        console.log('NO TOKEN', route, body);
        const res = await fetch(route, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${JSON.parse(token)}`,
                ...headers
                // 'Accept-Language': strings.getLanguage(),
            },
            body: body,
        });
        console.log(res, '==', res.status);
        if (res.status === 401 || res.status === 403 || res.status === 422) {
            // EventRegister.emit('updateIsAuth')
            // Toast(`${statusMessage[res.status]}`)
            var msgData = statusMessage[res.status]
            if (!msgData) {
                msgData = await res.json()
            } else {
                msgData = { data: null, message: statusMessage[res.status], status: 'error' }
            }
            onError(msgData);
            return;
        }

        if (res.status !== 200) {
            const resText = await res.json();
            console.log(resText);
            onError(resText);
            // onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        console.log("===>>JSON DATA");
        const resJSON = await res.json();
        console.log('resJSON-----', resJSON);
        if (resJSON.status === 1) {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};

export const POST_FORMDATA = async (
    route,
    body = {},
    onSuccess = () => { },
    onError = () => { },
    onFail = () => {
        Toast('Check Network, Try Again.');
    },
    headers = {}
) => {
    try {
        console.log('NO TOKEN', route, body);
        const res = await fetch(route, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',

                ...headers
                // 'Accept-Language': strings.getLanguage(),
            },
            body: body,
        });
        console.log(res, '==', res.status);
        if (res.status === 401 || res.status === 403 || res.status === 422) {
            // EventRegister.emit('updateIsAuth')
            // Toast(`${statusMessage[res.status]}`)
            var msgData = statusMessage[res.status]
            if (!msgData) {
                msgData = await res.json()
            } else {
                msgData = { data: null, message: statusMessage[res.status], status: 'error' }
            }
            onError(msgData);
            return;
        }

        if (res.status !== 200) {
            const resText = await res.json();
            console.log(resText);
            onError(resText);
            // onError({ data: null, msg: statusMessage[res.status], status: 'error' });
            return { data: null, msg: statusMessage[res.status], status: 'error' };
        }
        console.log("===>>JSON DATA");
        const resJSON = await res.json();
        console.log('resJSON-----', resJSON);
        if (resJSON.status === 1) {
            onSuccess(resJSON);
            return {
                ...resJSON,
            };
        } else {
            onError(resJSON);
            return {
                ...resJSON,
            };
        }
    } catch (error) {
        console.log(error);
        onFail({ data: null, msg: 'Network Error', status: 'error' });
        return { data: null, msg: 'Network Error', status: 'error' };
    }
};
