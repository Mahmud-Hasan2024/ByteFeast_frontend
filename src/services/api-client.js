import axios from "axios";

export default axios.create({
  baseURL: "https://byte-feast-resturant-django-rest-ap.vercel.app/api/v1",
});