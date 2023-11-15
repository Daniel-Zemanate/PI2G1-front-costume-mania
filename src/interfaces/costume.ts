export interface Costume {
    // id: number,
    // name: string,
    // price: number,
    // url_image: string,
    // sizes: Size[]
    modelId: number,
    model: string,
    price: number,
    image: string,
    sizeType: number,
    category: string
    sizes: Size[]
}

export interface Size {
    id: number,
    adult: boolean,
    no_size: string,
    size_description: string
}

export interface ApiCostume {
    idModel:  number;
    name:     string;
    urlImage: string | null;
    category: Category;
    sizes:    ApiSize[];
    price: number;
}

export interface ApiSize {
    quantity:        number;
    noSize:          string;
    sizeDescription: string;
}

export interface Category {
    idCategory: number;
    name:       string;
}

export interface Model {
    idModel:   number;
    nameModel: string;
    category:  Category;
    urlImage:  null;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}