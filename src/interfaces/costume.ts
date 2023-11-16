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

export interface ApiCostumeResponse {
    content:          ApiCostume[] | [];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    size:             number;
    number:           number;
    sort:             any[];
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface ApiCostume {
    model:    string;
    modelId:  number;
    category: string;
    image:    string;
    sizeType: number;
    price:    number;
    sizes:    ApiSize[];
}

export interface ApiSize {
    idCatalog: number;
    size:      string;
    quantity:  number;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       any[];
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Category {
    idCategory: number;
    name:       string;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

export type KeyValue = {
    key: string;
    value: string;
  };