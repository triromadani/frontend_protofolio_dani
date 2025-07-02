import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('fetch("https://beckendwebdani-production.up.railway.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setResponse("Pesan berhasil dikirim!");
        setForm({ name: '', email: '', message: '' });
      } else {
        setResponse("Terjadi kesalahan saat mengirim pesan.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Gagal menghubungi server.");
    }
  };

  return (
    <section className="contact-section">
      <h2>Hubungi Saya</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nama Anda"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Alamat Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Pesan</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tulis pesan Anda..."
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Kirim Pesan</button>
      </form>

      {response && <p className="response-message">{response}</p>}
    </section>
  );
}
