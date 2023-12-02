export interface Catalog {
    idCatalog: number
    model: Model
    size: Size
    stock: number
    price: number
    statusCatalog: Status
    status: Status
}

export interface Model {
    idModel: number
    nameModel: string
    category: Category
    urlImage: string
    statusModel: Status
    status: Status
}

export interface Category {
    idCategory: number
    name: string
    statusCategory: Status
    status: Status
}


export interface Size {
    id: number
    adult: number
    noSize: string
    sizeDescription: string
}

export interface Status {
    id: number
}

export interface CatalogDataTable {
    id: number,
    model: string,
    adult: string,
    size: string,
    status: string,
    stock: number,
    price: number,
    category: string
}
