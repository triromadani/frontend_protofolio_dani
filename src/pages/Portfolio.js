import React, { useEffect, useState } from 'react';
import './Portfolio.css';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const BASE_URL = 'https://backendwebdani-production.up.railway.app '; // ✅ Perbaiki spasi

  // Ambil data proyek dari backend
  const fetchProjects = async () => {
    console.log("🔄 Mengambil data proyek dari backend...");
    try {
      const res = await fetch(`${BASE_URL}/api/portfolios`);
      console.log("📡 Response status:", res.status);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Data dari backend:", data);
      setProjects(data);
    } catch (err) {
      console.error('❌ Fetch projects error:', err);
      alert("Gagal mengambil data dari backend. Pastikan backend sedang aktif.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Input form
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Simpan atau update proyek
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) return;

    const url = editingId
      ? `${BASE_URL}/api/portfolios/${editingId}`
      : `${BASE_URL}/api/portfolios`;

    const method = editingId ? 'PUT' : 'POST';

    try {
      console.log("📤 Mengirim data:", form);
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      console.log("📨 Status Kirim:", res.status);
      const resText = await res.text();
      console.log("📨 Response Text:", resText);

      if (res.ok) {
        fetchProjects();
        setForm({ title: '', description: '' });
        setEditingId(null);
      } else {
        console.error('Gagal menyimpan data:', resText);
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  // Edit proyek
  const handleEdit = (project) => {
    setForm({ title: project.title, description: project.description });
    setEditingId(project.id);
  };

  // Hapus proyek
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus proyek ini?')) return;
    try {
      await fetch(`${BASE_URL}/api/portfolios/${id}`, {
        method: 'DELETE',
      });
      fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Download proyek sebagai file JSON
  const handleDownload = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'daftar-proyek.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="portfolio-container">
      <h2 className="title">Portofolio Proyek</h2>
      <button className="download-button" onClick={handleDownload}>
        Download Proyek
      </button>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Judul Proyek"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Deskripsi Proyek"
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? 'Simpan Perubahan' : 'Tambah'}
        </button>
      </form>

      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="actions">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Hapus</button>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada proyek ditemukan atau backend sedang offline.</p>
        )}
      </div>
    </div>
  );
}

export default Portfolio;