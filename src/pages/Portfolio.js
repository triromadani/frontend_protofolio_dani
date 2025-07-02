import React, { useEffect, useState } from 'react';
import './Portfolio.css';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  // Ambil data dari backend
  const fetchProjects = () => {
    fetch('http://localhost:4000/api/portfolios')
      .then(res => res.json())
      .then(data => {
        console.log('Data dari backend:', data);
        setProjects(data);
      })
      .catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("Tombol tambah diklik, form:", form);

    if (!form.title || !form.description) {
      alert('Judul dan Deskripsi tidak boleh kosong!');
      return;
    }

    const url = editingId
      ? `http://localhost:4000/api/portfolios/${editingId}`
      : 'http://localhost:4000/api/portfolios';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan data!');
      }

      fetchProjects();
      setForm({ title: '', description: '' });
      setEditingId(null);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleEdit = (project) => {
    setForm({ title: project.title, description: project.description });
    setEditingId(project._id || project.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus proyek ini?')) return;

    try {
      const response = await fetch(`http://localhost:4000/api/portfolios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus data!');
      }

      fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">Portofolio Proyek</h2>

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
        {projects.length === 0 ? (
          <p className="empty-message">Belum ada proyek ditambahkan.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id || project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="actions">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id || project.id)}>Hapus</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Portfolio;
