import "./Filters.css";

import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import getTopics from "../api-interactions/getTopics";

export default function Filters() {
  let { topic } = useParams();

  const [topicOptions, setTopicOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topic);

  let navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedTopic(e.target.value);

    navigate(`/articles/${e.target.value}`);
  };

  useEffect(
    (selectedTopic) => {
      getTopics(selectedTopic).then(({ topics }) => {
        setTopicOptions(topics);
      });
    },
    [selectedTopic]
  );

  return (
    <div id="filter-box">
      <h3 id="filter-title">Filter:</h3>
      <label>
        <select value={selectedTopic} onChange={handleChange}>
          <option key="all" value="All">
            Choose a topic
          </option>
          {topicOptions.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {slug}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
