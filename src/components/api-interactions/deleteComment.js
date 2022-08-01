import axios from "axios";

export default function deleteComment(id) {
  return axios
    .delete(`https://newsbloom.herokuapp.com/api/comments/${id}`, {})
    .then((res) => {
      return res;
    });
}
