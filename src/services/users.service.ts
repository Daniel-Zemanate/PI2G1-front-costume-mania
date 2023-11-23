export const getUserInfo = async (token: any) => {
  const url = `${process.env.URL_LOCAL}/api/users/me`
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
}

export const getLastPurchases = async ({token, idUser}: {token: string, idUser: string}) => {
  const url = `${process.env.URL_LOCAL}/api/users/purchases/${idUser}`
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
}