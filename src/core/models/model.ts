export interface Media {
    
    img_url?: string,
    alt_text?: string,
    is_feature?: boolean
    
}
export interface Product{
    id?: number,
    sku?: string,
    store_price?: string,
    is_default?: boolean,
    brand?: {
        name?: string
    },
    product?: {
        name: string,
        web_id : string,
        category?:{
            name: string,
            slug: string,
            is_active: boolean
        },
        description?:string,
        rating:"string",
        no_reviews:number
    },
    weight?: number,
    media?: Media[],
    attributes?: [
        {
            attribute_value?: string,
            product_attribute?: {
                id?: number,
                name?: string,
                description?: string
            }
        }
    ],
    product_type?: {
        name? : string
    }
    sale_price: string,
    units: number,
    units_sold: number
}

export interface Token{
    access_token:string
    access_token_life_time_in_seconds:number
    refresh_token:string
    refresh_token_life_time_in_seconds:number
}