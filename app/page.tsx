'use client';

import { useState } from 'react';
import Image from 'next/image'; // Impor komponen Image
import jadwalData from '../public/data/jadwal.json';
import prokerData from '../public/data/proker.json';

// Definisikan tipe data untuk Proker dan Jadwal (Best Practice)
type Petugas = {
  nama: string;
  foto: string;
};

type SubKegiatan = {
  nama: string;
  selesai: boolean;
};

type Proker = {
  id: number;
  nama: string;
  gambar: string;
  catatan: string;
  sub_kegiatan: SubKegiatan[];
};

export default function HomePage() {
  // 'setJadwalHariIni' dihapus karena belum dipakai untuk menghindari error
  const [jadwalHariIni] = useState(jadwalData[0]);
  const [tugasAktif, setTugasAktif] = useState<string | null>(null);

  const handleTugasClick = (jenisTugas: string) => {
    setTugasAktif(tugasAktif === jenisTugas ? null : jenisTugas);
  };

  // Fungsi hitungProgress dengan tipe data yang benar
  const hitungProgress = (proker: Proker) => {
    const totalSub = proker.sub_kegiatan.length;
    if (totalSub === 0) return 0;
    const selesaiSub = proker.sub_kegiatan.filter((sub) => sub.selesai).length;
    return Math.round((selesaiSub / totalSub) * 100);
  };

  return (
    <main className="bg-gray-100 min-h-screen font-sans">
      <div className="relative bg-pink-200 p-6 rounded-b-3xl text-center text-white overflow-hidden">
         <h1 className="text-4xl font-bold z-10 relative">Dashboard WarTeg!</h1>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <input type="text" placeholder="Search here" className="w-full p-2 rounded-lg border" />
        </div>

        <h2 className="text-xl font-bold mb-2">JADWAL HARIAN</h2>
        <div className="text-center mb-4">
          <p className="font-semibold">{jadwalHariIni.hari}, {jadwalHariIni.tanggal}</p>
        </div>
        
        <div className="flex justify-around mb-4">
          <button onClick={() => handleTugasClick('balai_desa')} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-green-200">
            <span>Icon</span> 
            <span className="text-sm font-medium">Balai Desa</span>
          </button>
          <button onClick={() => handleTugasClick('masak')} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-green-200">
            <span>Icon</span>
            <span className="text-sm font-medium">Masak</span>
          </button>
          <button onClick={() => handleTugasClick('lain_lain')} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-green-200">
            <span>Icon</span>
            <span className="text-sm font-medium">Lain-lain</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          {tugasAktif === 'balai_desa' && (
            <div>
              <h3 className="font-bold mb-2">Petugas di Balai Desa</h3>
              <div className="flex gap-4">
                {jadwalHariIni.tugas.balai_desa.map((petugas: Petugas) => (
                  <div key={petugas.nama} className="text-center">
                    <Image src={petugas.foto} alt={petugas.nama} width={64} height={64} className="w-16 h-16 rounded-full object-cover mx-auto" />
                    <p>{petugas.nama}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tugasAktif === 'masak' && (
            <div>
              <h3 className="font-bold mb-2">Petugas Masak</h3>
              <div className="grid grid-cols-2 gap-4">
                {jadwalHariIni.tugas.masak.map((petugas: Petugas) => (
                  <div key={petugas.nama} className="text-center">
                    <Image src={petugas.foto} alt={petugas.nama} width={64} height={64} className="w-16 h-16 rounded-full object-cover mx-auto" />
                    <p>{petugas.nama}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tugasAktif === 'lain_lain' && (
             <div>
               <h3 className="font-bold mb-2">Jadwal Tentatif</h3>
               <p>Belum ada jadwal yang diinput.</p>
             </div>
          )}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-2">PROGRESS PROKER</h2>
        <div className="grid grid-cols-2 gap-4">
          {prokerData.map((proker: Proker) => {
            const progress = hitungProgress(proker);
            return (
              <div key={proker.id} className="bg-white rounded-lg shadow overflow-hidden border-4 border-green-400">
                <div className="relative">
                  <Image src={proker.gambar} alt={proker.nama} width={200} height={96} className="w-full h-24 object-cover" />
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">{progress}%</span>
                </div>
                <div className="p-2 flex justify-between items-center bg-gray-50">
                  <p className="font-semibold">{proker.nama}</p>
                  <button className="text-green-600 font-bold text-sm">Buy Now</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}
