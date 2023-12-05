
export interface Catalog {
    idCatalog: number
    model: Model
    size: Size
    stock: number
    price: number
    statusCatalog: Status
}

export type TableCatalog = Catalog & {id: string}

export interface Model {
    idModel: number
    nameModel: string
    category: Category
    urlImage: string
    statusModel: Status
}

export interface Category {
    idCategory: number
    name: string
    statusCategory: Status
}


export interface Size {
    id: number
    adult: number
    noSize: string
    sizeDescription: string
}

export interface Status {
    id: number
    description: string
}