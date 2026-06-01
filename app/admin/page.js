'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'galabau2026') {
      setIsAuthorized(true);
    } else {
      alert('Falsches Passwort!');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/gallery/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Bild erfolgreich in deiner Galerie veröffentlicht!');
      setFile(null);
      router.push('/');
    } else {
      alert('Upload fehlgeschlagen.');
    }
    setUploading(false);
  };

  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1A1D1A] px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 text-black rounded shadow-xl w-full max-w-sm space-y-4 border border-gray-100">
          <h2 className="text-xl font-light text-center uppercase tracking-wider text-[#1A1D1A]">Gala-Bau Admin Login</h2>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-4"></div>
          <input type="password" placeholder="Passwort eingeben" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#F7F9F6] border-b border-gray-200 focus:border-[#C5A880] p-3 text-sm outline-none transition-colors" />
          <button type="submit" className="w-full bg-[#1A1D1A] hover:bg-[#607762] text-white py-3 text-xs uppercase tracking-widest font-medium transition-all rounded-sm">Einloggen</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9F6] py-24 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-light mb-2 text-[#1A1D1A]">Bilder-Verwaltung</h1>
      <p className="text-gray-500 font-light text-sm mb-8">Füge deiner Referenzgalerie neue Bilder per Drag-and-Drop hinzu – ganz ohne lästige Bild-URLs.</p>
      
      <form onSubmit={handleUpload} className="bg-white p-8 border border-gray-200 rounded-sm shadow-sm space-y-6">
        <div className="border-2 border-dashed border-gray-300 hover:border-[#607762] transition-colors p-12 text-center rounded-sm cursor-pointer relative bg-[#F7F9F6]">
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
          <svg className="w-8 h-8 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <p className="text-gray-600 font-light text-sm">{file ? `Ausgewählte Datei: ${file.name}` : 'Bild hierhin ziehen oder klicken, um eine Datei vom Rechner auszuwählen'}</p>
        </div>
        <button type="submit" disabled={uploading} className="w-full bg-[#1A1D1A] hover:bg-[#607762] text-white py-4 text-xs tracking-widest uppercase font-medium transition-all disabled:bg-gray-400 rounded-sm shadow-sm">
          {uploading ? 'Wird hochgeladen...' : 'Bild in Galerie veröffentlichen'}
        </button>
      </form>
    </div>
  );
}
