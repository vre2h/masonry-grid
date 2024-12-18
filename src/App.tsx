import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PhotoView from "./pages/PhotoView";
import { ErrorBoundary } from "./components/meta/ErrorBoundary";
import ScrollToTop from "./components/meta/ScrollToTop";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo/:id" element={<PhotoView />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
