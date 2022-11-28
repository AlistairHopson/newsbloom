import axios from "axios";

export default function getArticles(topic, sort_by, order) {
  return axios
    .get("https://newsbloom.cyclic.app/api/articles", {
      params: {
        topic: topic === "All" ? undefined : topic,
        sort_by: sort_by === "date" ? undefined : sort_by,
        order: order,
      },
    })
    .then((res) => {
      return res.data;
    });
}
