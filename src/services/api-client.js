import axios from "axios";

export default axios.create({
  baseURL: "https://bytefeast-resturant-django-rest-api.vercel.app/api/v1",
});