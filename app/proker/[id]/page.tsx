'use client';

import prokerData from '../../../public/data/proker.json';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next'; // Impor tipe NextPage

// Definisikan tipe untuk props di luar komponen
interface ProkerDetailProps {
  params: {
    id: string;
  };
}

// Definisikan komponen sebagai const dengan tipe NextPage<ProkerDetailProps>
const ProkerDetailPage: NextPage<ProkerDetailProps> = ({ params }) => {
  const router = useRouter();
  const proker = prokerData.find(p => p.id === parseInt(params.id));
  
  const [subKegiatan, setSubKegiatan] = useState(proker?.sub_kegiatan || []);

  if (!proker) {
    return <p>Proker tidak ditemukan.</p>;
  }

  const handleChecklistChange = (index: number) => {
    const newSubKegiatan = [...subKegiatan];
    newSubKegiatan[index].selesai = !newSubKegiatan[index].selesai;
    setSubKegiatan(newSubKegiatan);
  };
  
  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 font-bold">&larr; Kembali</button>
      <h1 className="text-3xl font-bold mb-4">{proker.nama}</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="font-bold text-lg mb-2">Catatan Persiapan</h2>
        <p>{proker.catatan}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-lg mb-2">Checklist Kegiatan</h2>
        <ul>
          {subKegiatan.map((sub, index) => (
            <li key={index} className="flex items-center gap-3 mb-2">
              <input 
                type="checkbox" 
                checked={sub.selesai}
                onChange={() => handleChecklistChange(index)}
                className="w-5 h-5"
              />
              <span className={sub.selesai ? 'line-through text-gray-500' : ''}>
                {sub.nama}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProkerDetailPage;