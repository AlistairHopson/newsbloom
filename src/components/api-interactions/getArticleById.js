import axios from "axios";

export default function getArticleById(id) {
  return axios
    .get(`https://newsbloom.herokuapp.com/api/articles/${id}`)
    .then((res) => {
      console.log(res);
      console.log(id, "id");
      return res.data;
    });
}
