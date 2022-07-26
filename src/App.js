import "./App.css";

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Profile from "./components/Profile/Profile";
import Nav from "./components/Nav/Nav";
import Filters from "./components/Filters/Filters";
import ArticleList from "./components/ArticleList/ArticleList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Filters />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:topic" element={<ArticleList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
