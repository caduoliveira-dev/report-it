export default interface Report {
  author: {
    email: string,
    name: string,
  }
  name: string,
  date: Date,
  description: string,
  lat: number,
  lng: number,
}