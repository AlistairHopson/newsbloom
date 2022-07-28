import axios from "axios";

export default function getArticles(props) {
  return axios
    .get("https://newsbloom.herokuapp.com/api/articles", {
      params: {
        topic: props === "All" ? undefined : props,
      },
    })
    .then((res) => {
      return res.data;
    });
}
