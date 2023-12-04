  export const getAdminModel = async () => {
    const url = `${process.env.PRODUCT_API_URL}/model/all`;
    const response = await fetch(url);
    return await response.json();
  };
  