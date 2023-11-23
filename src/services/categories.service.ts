export const getCategories = async () => {
  const url = `${process.env.PRODUCT_API_URL}/category`;
  const response = await fetch(url);
  return await response.json();
};
