import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profile from "./components/Profile/Profile";
import Nav from "./components/Nav/Nav";
import ArticleList from "./components/ArticleList/ArticleList";
import FullArticle from "./components/FullArticle/FullArticle";
function App() {
  return (
    <BrowserRouter>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
