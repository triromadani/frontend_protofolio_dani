import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Beranda</Link>
          <Link to="/about">Tentang Saya</Link>
          <Link to="/portfolio">Portofolio</Link>
          <Link to="/contact">Kontak</Link>
          <Link to="/blog">Blog</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
