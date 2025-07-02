import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import './Home.css'; // Import file CSS baru

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-icon">
          <FiUser size={60} />
        </div>
        <h1 className="home-title">Halo, Selamat Datang!</h1>
        <p className="home-subtitle">
          Saya mahasiswa STMIK WIDYA UTAMA semester 6 yang tertarik di bidang teknologi khususnya IT dan desain.<br />
          Yuk lihat karya dan perjalanan saya!
        </p>
        <Link to="/portfolio" className="home-button">
          <FiUser className="icon-left" />
          Lihat Portofolio
        </Link>
      </div>
    </div>
  );
}

export default Home;
