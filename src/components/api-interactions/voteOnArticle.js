import axios from "axios";

export default function voteOnArticle(id, vote) {
  return axios
    .patch(`https://newsbloom.cyclic.app/api/articles/${id}`, {
      inc_votes: vote,
    })
    .then((res) => {
      return res.data;
    });
}
