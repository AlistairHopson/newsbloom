import axios from "axios";

export default function postComment(id, username, comment) {
  return axios
    .post(`https://newsbloom.cyclic.app/api/articles/${id}/comments`, {
      username: username,
      body: comment,
    })
    .then((res) => {
      return res.data;
    });
}
