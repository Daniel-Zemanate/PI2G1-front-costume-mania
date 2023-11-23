export const getShipping = async () => {
    const url = `${process.env.PRODUCT_API_URL}/shipping`;
    const response = await fetch(url);
    return await response.json();
};