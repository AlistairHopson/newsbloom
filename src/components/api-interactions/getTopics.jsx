import axios from "axios";

export default function getTopics() {
  return axios.get("https://newsbloom.herokuapp.com/api/topics").then((res) => {
    return res.data;
  });
}
