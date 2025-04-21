import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchResult from "./routes/SearchResult";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviesone" element={<Home />} />
        <Route path="/:type/:id" element={<Detail />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
