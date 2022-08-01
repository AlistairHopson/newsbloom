import axios from "axios";

export default function getArticleComments(id) {
  return axios
    .get(`https://newsbloom.herokuapp.com/api/articles/${id}/comments`)
    .then((res) => {
      return res.data;
    });
}
