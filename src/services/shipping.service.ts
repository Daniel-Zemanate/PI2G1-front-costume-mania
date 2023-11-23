export const getShipping = async () => {
    const url = `${process.env.URL_LOCAL}/api/shipping`;
    const response = await fetch(url);
    return await response.json();
};