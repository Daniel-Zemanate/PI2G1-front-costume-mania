export const getAdminInvoices = async () => {
  const url = `${process.env.PRODUCT_API_URL}/sale/invoice`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};