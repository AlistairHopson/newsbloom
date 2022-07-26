import axios from "axios";

export default function getArticles(props) {
  console.log(props, "props in getArticles");
  return axios
    .get("https://newsbloom.herokuapp.com/api/articles", {
      params: {
        topic: props === "All" ? undefined : props,
        // sort_by: sortCategory,
        // order: order,
      },
    })
    .then((res) => {
      return res.data;
    });
}
