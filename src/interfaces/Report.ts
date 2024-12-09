export default interface Report {
  author: {
    email: string,
    name: string,
  },
  name: 'Blitz' | 'Acidente' | 'Rua Bloqueada' | 'Congestionamento' | 'Chuva',
  date: Date,
  description: string,
  lat: number,
  lng: number,
  [key: string]: any,
}