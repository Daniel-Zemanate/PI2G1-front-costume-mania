export const getCategories = async () => {
  const url = `${process.env.URL_LOCAL}/api/categories`
  const response = await fetch(url);
  return await response.json();
}

export const getAllCategories = async () => {
  const url = `${process.env.URL_LOCAL}/api/costumes/new`
  const response = await fetch(url);
  return await response.json();
}