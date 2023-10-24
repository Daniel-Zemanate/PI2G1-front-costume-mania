export interface costume {
    id: number,
    name: string,
    price: number,
    url_image: string,
    sizes: Size[]
}

export interface Size {
    id: number,
    adult: boolean,
    no_size: string,
    size_description: string
}