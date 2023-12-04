import { Model } from "@/interfaces/catalog";

export const getModelsToSelectFormat = (models: Model[]) => {
    let selectFromat: { label: string, id: string }[] = [];

    models.map(model => {
        selectFromat.push({
            id: model.idModel.toString(),
            label: model.nameModel
        })
    })

    return selectFromat
}