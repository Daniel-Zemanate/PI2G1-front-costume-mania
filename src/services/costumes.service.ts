
export const getCostume = async (costumeId: number) => {
    const url = `${process.env.URL_LOCAL}/api/costumes/${costumeId}`
    const response = await fetch(url);
    return await response.json();
}

export const getCostumes = async () => {
    const url = `${process.env.URL_LOCAL}/api/costumes`
    const response = await fetch(url);
    return await response.json();
}

export const getPopularCostumes = async () => {
    const url = `${process.env.URL_LOCAL}/api/costumes/popular`
    const response = await fetch(url);
    return await response.json();
}