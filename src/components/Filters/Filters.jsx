import "./Filters.css";

import { BrowserRouter, Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import getTopics from "../api-interactions/getTopics";

export default function Filters() {
  let { topic } = useParams();
  console.log(topic, "<<topic");

  const [topicOptions, setTopicOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topic);

  let navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedTopic(e.target.value);

    navigate(`/articles/${e.target.value}`);

    // e.target.value === "All"
    //   ? navigate(`/articles`)
    //   : navigate(`/articles/${e.target.value}`);
  };

  useEffect(
    (selectedTopic) => {
      getTopics(selectedTopic).then(({ topics }) => {
        setTopicOptions(topics);
      });
    },
    [selectedTopic]
  );

  console.log(selectedTopic, "selectedTopic in filter");

  return (
    <div className="filter-box">
      <h3>Filters:</h3>
      <label>
        <select
          defaultValue={selectedTopic}
          value={selectedTopic}
          onChange={handleChange}
        >
          <option key="all" value={undefined}>
            All
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
