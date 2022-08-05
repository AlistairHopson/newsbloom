import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AccountContext } from "./components/AccountContext";
import { useState } from "react";

import Profile from "./components/Profile/Profile";
import Nav from "./components/Nav/Nav";
import ArticleList from "./components/ArticleList/ArticleList";
import FullArticle from "./components/FullArticle/FullArticle";
import GeneralErrorPath from "./components/GeneralErrorPath/GeneralErrorPath";

function App() {
  const [account, setAccount] = useState({
    username: "cooljmessy",
    name: "Peter Messy",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?",
  });

  return (
    <BrowserRouter>
      <AccountContext.Provider value={{ username: [account, setAccount] }}>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:topic" element={<ArticleList />} />
            <Route
              path="/articles/article/:article_id"
              element={<FullArticle />}
            />
            <Route path="*" element={<GeneralErrorPath />} />
          </Routes>
        </div>
      </AccountContext.Provider>
    </BrowserRouter>
  );
}

export default App;
