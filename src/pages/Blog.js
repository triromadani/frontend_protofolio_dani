import React from 'react';
import './Blog.css'; // Pastikan file ini dibuat

function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-wrapper">
        <h2 className="blog-title">Perjalanan & Pengalaman</h2>

        <div className="timeline">
          <div className="timeline-item">
            <div className="year">2024</div>
            <h3 className="position">Magang di DINAKERKOP UKM</h3>
            <p className="description">
              Mempelajari di bidang UMKM selama 6 bulan.
            </p>
          </div>

          <div className="timeline-item">
            <div className="year">2020 - 2021</div>
            <h3 className="position">Admin Onlineshop</h3>
            <p className="description">
              Dengan tugas merekap penjualan serta membalas chat customer.
            </p>
          </div>

          <div className="timeline-item">
            <div className="year">2024</div>
            <h3 className="position">Pengurus KSR Bagian Perkap</h3>
            <p className="description">
              Masa jabatan 2023–2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
