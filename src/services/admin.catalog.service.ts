import { Catalog } from "@/interfaces/catalog";

export const getAdminCatalog = async () => {
  const url = `${process.env.PRODUCT_API_URL}/catalog`;
  const response = await fetch(url);
  const data = await response.json();

  const formattedData = data.map((category: Catalog) => ({
    ...category,
    id: category.idCatalog,
  }));

  return formattedData;
};

export const getSizes = async () => {
  const url = `${process.env.PRODUCT_API_URL}/size`;
  const response = await fetch(url);
  return await response.json()
};
