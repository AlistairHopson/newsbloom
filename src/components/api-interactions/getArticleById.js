import axios from "axios";

export default function getArticleById(id) {
  return axios
    .get(`https://newsbloom.herokuapp.com/api/articles/${id}`)
    .then((res) => {
      return res.data;
    });
}
