import React from "react";
import avatar from "../images/avatar.jpeg";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">Tentang Saya</h2>

      <div className="about-content">
        <div className="pentagon-image">
          <img src={avatar} alt="Foto Saya" />
        </div>

        <div className="about-text">
          <p>
            Saya adalah seorang mahasiswa aktif dari <strong>STMIK Widya Utama</strong>, jurusan <strong>Teknik Informatika</strong>,
            yang saat ini telah memasuki <strong>semester 6</strong> dan berusia <strong>23 tahun</strong>.
            Saya memiliki ketertarikan yang tinggi dalam bidang teknologi informasi serta semangat belajar yang kuat untuk terus berkembang.
          </p>

          <p>
            Di luar dunia akademik, saya memiliki hobi <strong>bernyanyi</strong> dan <strong>bermain game</strong> yang membantu saya menjaga keseimbangan
            antara kreativitas dan fokus. Saya juga terbiasa menggunakan perangkat lunak produktivitas seperti <strong>Microsoft Word</strong> dan <strong>Excel</strong>,
            baik untuk keperluan kuliah maupun pengalaman kerja.
          </p>

          <p>
            Selama masa studi, saya aktif mengikuti berbagai kegiatan magang dan pekerjaan paruh waktu, yang membekali saya dengan kemampuan <strong>komunikasi</strong>,
            <strong>kerja tim</strong>, dan <strong>ketelitian</strong> dalam menyelesaikan tugas secara efektif.
          </p>

          <p>
            Saya adalah individu yang <strong>cepat beradaptasi</strong>, terbuka terhadap tantangan baru, dan memiliki komitmen kuat dalam menyelesaikan
            setiap tanggung jawab secara maksimal. Dengan kombinasi latar belakang akademik, <strong>soft skill</strong>, dan <strong>kemampuan teknis</strong> yang saya miliki,
            saya siap memberikan kontribusi terbaik di dunia kerja, khususnya dalam bidang teknologi dan administrasi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
