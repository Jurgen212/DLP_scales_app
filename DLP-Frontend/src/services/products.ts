import { Product } from '@interfaces/Products';


const serverUrl = import.meta.env.SERVER_URL

export const getProductsByType = async ( type: string ) =>{

    const res = await fetch( serverUrl )
    const result = await res.json()
    
    result.results.map( (res: Product) =>{
        if( res.type === type ) return res
    })

    return result
}

