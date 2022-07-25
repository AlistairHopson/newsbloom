import axios from "axios";

export default function getArticles() {
  return axios
    .get("https://newsbloom.herokuapp.com/api/articles")
    .then((res) => {
      return res.data;
    });
}
