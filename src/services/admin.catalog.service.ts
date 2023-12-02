export const getAdminCatalog = async () => {
  const url = `${process.env.PRODUCT_API_URL}/catalog`;
  const response = await fetch(url);
  return await response.json();
};
