import React, { useEffect, useState } from 'react';
import './Portfolio.css';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  // Ambil data proyek dari backend
  const fetchProjects = () => {
    fetch('fetch("https://beckendwebdani-production.up.railway.app/api/protofolios')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Fetch projects error:', err));
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
  const handleSubmit = async () => {
    if (!form.title || !form.description) return;

    const url = editingId
      ? `http://localhost:4000/api/portfolios/${editingId}`
      : 'http://localhost:4000/api/portfolios';
    const method = editingId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      fetchProjects();
      setForm({ title: '', description: '' });
      setEditingId(null);
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
      await fetch(`http://localhost:4000/api/portfolios/${id}`, {
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

      <div className="form-container">
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Judul Proyek"
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Deskripsi Proyek"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId ? 'Simpan Perubahan' : 'Tambah'}
        </button>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="actions">
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDelete(project.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
