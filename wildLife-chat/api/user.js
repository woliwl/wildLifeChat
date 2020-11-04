import $request from '../lib/request.js'

export const getSecssionKey = (code) =>{
    return $request({
        method:'POST',
        url:"/user/user/getSecssionKey",
        data:code
    })
}

export const getUserData = (param) =>{
    return $request({
        method:'POST',
        url:"/user/user/getUserData",
        data:param
    })
}