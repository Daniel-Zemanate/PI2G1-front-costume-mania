import { Model } from "@/interfaces/model";

  export const getAdminModel = async () => {
    const url = `${process.env.PRODUCT_API_URL}/model/all`;
    const response = await fetch(url);
    const data = await response.json();

    const formattedData = data.map((model: Model) => ({
      ...model,
      id: model.idModel,
    }));

    return formattedData;
  };
  