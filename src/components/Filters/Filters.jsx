import "./Filters.css";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";

import getTopics from "../api-interactions/getTopics";

export default function Filters() {
  let { topic } = useParams();

  const [searchParams] = useSearchParams();
  let sort_by = searchParams.get("sort_by");
  let order = searchParams.get("order");

  const [topicOptions, setTopicOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [selectedSortMethod, setSelectedSortMethod] = useState("date");
  const [selectedOrderMethod, setSelectedOrderMethod] = useState("desc");

  let navigate = useNavigate();

  const updateTopic = (e) => {
    e.preventDefault();
    setSelectedTopic(e.target.value);
    navigate(
      `/articles/${e.target.value}?sort_by=${
        selectedSortMethod === null ? "date" : selectedSortMethod
      }&order=${selectedOrderMethod === null ? "desc" : selectedOrderMethod}`
    );
  };

  const updateSorting = (e) => {
    e.preventDefault();
    setSelectedSortMethod(e.target.value);
    navigate(
      `/articles${
        selectedTopic !== undefined ? `/${selectedTopic}` : ""
      }?sort_by=${e.target.value === null ? "date" : e.target.value}&order=${
        selectedOrderMethod === null ? "desc" : selectedOrderMethod
      }`
    );
  };

  const updateOrdering = (e) => {
    e.preventDefault();
    setSelectedOrderMethod(e.target.value);
    navigate(
      `/articles${
        selectedTopic === undefined ? `/` : `/${selectedTopic}/`
      }?sort_by=${
        selectedSortMethod === null ? "date" : selectedSortMethod
      }&order=${e.target.value === null ? order : e.target.value}`
    );
  };

  useEffect(
    (selectedTopic) => {
      getTopics(selectedTopic).then(({ topics }) => {
        setTopicOptions(topics);
      });
    },
    [selectedTopic]
  );

  useEffect(() => {
    setSelectedTopic(topic);
  }, [topic]);


  return (
    <div id="filter-box">
      <label>
        <select
          value={selectedTopic === undefined ? "All" : selectedTopic}
          onChange={updateTopic}
          id="filter-topic"
        >
          <option key="all" value="All">
            Filter topic
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
      <label>
        <select
          value={selectedSortMethod === null ? "date" : selectedSortMethod}
          onChange={updateSorting}
          id="sort-by"
        >
          <option value="date">sort by: date</option>
          <option value="comment_count">sort by: comments</option>
          <option value="votes">sort by: votes</option>
        </select>
      </label>
      <label>
        <select
          value={selectedOrderMethod === null ? "desc" : selectedOrderMethod}
          onChange={updateOrdering}
          id="order"
        >
          <option value="desc">descending</option>
          <option value="asc">ascending</option>
        </select>
      </label>
    </div>
  );
}
