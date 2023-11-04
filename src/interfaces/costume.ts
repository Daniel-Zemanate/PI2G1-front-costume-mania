export interface Costume {
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

export interface ApiCostume {
    idCatalog: number;
    model:     Model;
    size:      ApiSize;
    quantity:  number;
    price:     number;
}

export interface Model {
    idModel:   number;
    nameModel: string;
    category:  Category;
    urlImage:  null;
}

export interface Category {
    idCategory: number;
    name:       string;
}

export interface ApiSize {
    id:              number;
    adult:           number;
    noSize:          string;
    sizeDescription: string;
}

export interface ApiResponse {
    content:          ApiCostume[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}