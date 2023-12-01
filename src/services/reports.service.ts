export const getCompleteReport = async () => {
  const url = `${process.env.URL_LOCAL}/api/reports`;
  const response = await fetch(url);
  return await response.json();
};
