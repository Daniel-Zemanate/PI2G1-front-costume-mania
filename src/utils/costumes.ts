export function unifyObjects(arr: Array<any>): Array<any> {
  const unifiedObject: { [key: string]: any } = {};

  arr.forEach((item: any) => {
    const { model, size, quantity, price } = item;
    const { noSize, sizeDescription } = size;
    const { idModel, nameModel, urlImage, category } = model;

    if (!unifiedObject[model.nameModel]) {
      unifiedObject[model.nameModel] = {
        idModel: idModel,
        name: nameModel,
        urlImage: urlImage,
        category: category,
        sizes: [],
        price: price,
      };
    }

    unifiedObject[model.nameModel].sizes.push({
      quantity,
      noSize,
      sizeDescription,
    });
  });

  return Object.values(unifiedObject);
}
