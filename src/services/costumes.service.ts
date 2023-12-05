import { ApiCostumeResponse } from "@/interfaces/costume";

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

export const getStaticPopularCostumes = async () => {
  const url = `${process.env.PRODUCT_API_URL}/catalog/news/15`;
  const response = await fetch(url);
  return await response.json();
}; 

export const getStaticNewCostumes =async () => {
  const url = `${process.env.PRODUCT_API_URL}/catalog/news/15`;
  const response = await fetch(url);
  return await response.json();
}