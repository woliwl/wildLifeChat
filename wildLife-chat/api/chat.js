import $request from '../lib/request.js'

export const getReply = (param) =>{
    return $request({
        method:'POST',
        url:"/chat/chat/getReply",
        data:param
    })
}

export const createChatRoom = (param) =>{
    return $request({
        method:'POST',
        url:"/chat/chat/createChatRoom",
        data:param
    })
}

export const getChatRoomList = () =>{
    return $request({
        method:'GET',
        url:"/chat/chat/getChatRoomList",
    })
}

export const storeChat = (param) =>{
    return $request({
        method:'POST',
        url:"/chat/chat/storeChat",
        data:param
    })
}

export const getChatContent = (param) =>{
    return $request({
        method:'POST',
        url:"/chat/chat/getChatContent",
        data:param
    })
}

export const getUserChat = () =>{
    return $request({
        method:'GET',
        url:"/chat/chat/getUserChat",
    })
}


