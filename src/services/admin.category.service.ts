import { AdminCategory } from "@/interfaces/category";

export const getAdminCategories = async ({ token }: { token: string }) => {
  const url = `${process.env.PRODUCT_API_URL}/category/all`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await response.json()

  const formattedData = data.map((category: AdminCategory) => ({
    ...category,
    id: category.idCategory,
    status: category.statusCategory.description,
    idStatus: category.statusCategory.id
  }));

  return formattedData;
};