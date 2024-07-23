import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ListPage from "./views/ListPage/ListPage";
import DetailsPage from "./views/DetailsPage/DetailsPage";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";
import { getData } from "./controlers/dataController";
import Loader from "./components/Loader/Lodaer";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData(setData, setError, setLoading);
  }, []);

  return (
    <Router>
      <div className="main-container">
        {loading && <Loader />}
        {error && <p>Error: {error}</p>}
        <Routes>
          <Route
            path="/"
            element={data && data.length > 0 && <ListPage data={data} />}
          />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
