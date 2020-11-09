import $request from '../lib/request.js'

export const getAnimal = () =>{
    return $request({
        method:'GET',
        url:"/animal/animal/getAnimal",
    })
}

export const getAnimalMsg = (openid) =>{
    return $request({
        method:'POST',
        url:"/animal/animal/getAnimalMsg",
        data:openid
    })
}

export const searchAnimal = (value) =>{
    return $request({
        method:'POST',
        url:"/animal/animal/searchAnimal",
        data:value
    })
}
