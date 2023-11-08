export function fetchDummyUserData(user: {email?: string  | null, name?: string | null}){
  if(!user) return
  
  return {
    email: user.email || "",
    firstName: 'Lionel',
    lastName: 'Messi',
    address: 'Calle falsa 123',
    personalId: '12345678',
    birth: '24/006/1987',
    phone: '01188888888',
    city: 'Rosario',
    zipCode: '12345',
    country: 'Argentina',
    password: '123456'
  }
}