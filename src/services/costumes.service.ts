import { ApiCostume, ApiCostumeResponse, ApiFavModel } from "@/interfaces/costume";

export const getCostume = async (costumeId: number) => {
  const url = `${process.env.URL_LOCAL}/api/costumes/${costumeId}`;
  const response = await fetch(url);
  return await response.json();
};

const dummyEmptyData = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 12,
    sort: [],
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 1,
  totalElements: 4,
  last: true,
  size: 12,
  number: 0,
  sort: [],
  numberOfElements: 4,
  first: true,
  empty: true,
};

export const getCostumes = async (query: any): Promise<ApiCostumeResponse> => {
  const params = new URLSearchParams();
  const { category, search, size, page = 0 } = query;

  if (category) params.set("category", category);
  if (size) params.set("size", size);
  if (search) params.set("search", search);
  if (page) params.set("page", page);

  const url = `${process.env.URL_LOCAL}/api/costumes?${params.toString()}`;

  const response = await fetch(url);

  if (response.status === 204) {
    return dummyEmptyData;
  }

  const data = await response.json();

  return data;
};

export const getPopularCostumes = async () => {
  const url = `${process.env.URL_LOCAL}/api/costumes/popular`;
  const response = await fetch(url);
  return await response.json();
};

export const getNewCostumes = async () => {
  const url = `${process.env.URL_LOCAL}/api/costumes/new`;
  const response = await fetch(url);
  return await response.json();
};

// {
//   "count": 4,
//   "idModel": 27,
//   "nameModel": "Spiderman child",
//   "category": {
//       "idCategory": 4,
//       "name": "Fantasy",
//       "statusCategory": {
//           "id": 1,
//           "description": "Active"
//       }
//   },
//   "urlImage": "https://costumemania.s3.amazonaws.com/spiderman_small.jpg",
//   "price": 50.0,
//   "sizes": [
//       {
//           "idCatalog": 44,
//           "size": "8",
//           "quantity": 1
//       },
//       {
//           "idCatalog": 43,
//           "size": "6",
//           "quantity": 1
//       }
//   ]
// }

export const getStaticPopularCostumes = async () => {
  const url = `${process.env.PRODUCT_API_URL}/fav/FavModelV2`;
  const response = await fetch(url);
  const data: ApiFavModel[] = await response.json();

  const formattedData: ApiCostume[] = data.map(e => ({
    modelId: e.idModel,
    category: e.category.name,
    image: e.urlImage,
    price: e.price,
    model: e.nameModel,
    sizeType: e.sizeType,
    sizes: e.sizes,
  }))

  return formattedData;
};

export const getStaticNewCostumes = async () => {
  const url = `${process.env.PRODUCT_API_URL}/catalog/news/15`;
  const response = await fetch(url);
  return await response.json();
};
