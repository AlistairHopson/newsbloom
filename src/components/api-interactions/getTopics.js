import axios from "axios";

export default function getTopics() {
  return axios.get("https://newsbloom.cyclic.app/api/topics").then((res) => {
    return res.data;
  });
}
