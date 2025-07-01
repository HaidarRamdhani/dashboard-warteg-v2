// app/page.tsx
'use client'; // Wajib untuk interaktivitas (useState, onClick)

import { useState } from 'react';
import jadwalData from '../public/data/jadwal.json'; // Impor data jadwal
import prokerData from '../public/data/proker.json'; // Impor data proker

// Definisikan tipe data (opsional tapi sangat direkomendasikan dengan TypeScript)
type Petugas = {
  nama: string;
  foto: string;
};

export default function HomePage() {
  // State untuk mengelola jadwal hari ini
  const [jadwalHariIni, setJadwalHariIni] = useState(jadwalData[0]); // Ambil hari pertama sebagai default
  // State untuk menunjukkan detail jadwal mana yang sedang aktif (terbuka)
  const [tugasAktif, setTugasAktif] = useState<string | null>(null);

  const handleTugasClick = (jenisTugas: string) => {
    // Jika mengklik tombol yang sama, tutup. Jika beda, buka yang baru.
    setTugasAktif(tugasAktif === jenisTugas ? null : jenisTugas);
  };

  // Fungsi untuk menghitung progres proker
  const hitungProgress = (proker: any) => {
    const totalSub = proker.sub_kegiatan.length;
    if (totalSub === 0) return 0;
    const selesaiSub = proker.sub_kegiatan.filter((sub: any) => sub.selesai).length;
    return Math.round((selesaiSub / totalSub) * 100);
  };

  return (
    <main className="bg-gray-100 min-h-screen font-sans">
      {/* Bagian Header dengan gambar donat */}
      <div className="relative bg-pink-200 p-6 rounded-b-3xl text-center text-white overflow-hidden">
         {/* Anda bisa menambahkan gambar donat sebagai background di sini menggunakan CSS/Tailwind */}
         <h1 className="text-4xl font-bold z-10 relative">Dashboard WarTeg!</h1>
      </div>

      <div className="p-4">
        {/* Search Bar (hanya tampilan) */}
        <div className="mb-6">
          <input type="text" placeholder="Search here" className="w-full p-2 rounded-lg border" />
        </div>

        {/* Bagian Jadwal Harian */}
        <h2 className="text-xl font-bold mb-2">JADWAL HARIAN</h2>
        <div className="text-center mb-4">
          {/* Di sini bisa ditambahkan logika swipe atau tombol panah untuk ganti hari */}
          <p className="font-semibold">{jadwalHariIni.hari}, {jadwalHariIni.tanggal}</p>
        </div>

        <div className="flex justify-around mb-4">
          {/* Tombol Balai Desa */}
          <button onClick={() => handleTugasClick('balai_desa')} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-green-200">
            {/* Ganti dengan icon yang sesuai */}
            <span>Icon</span> 
            <span className="text-sm font-medium">Balai Desa</span>
          </button>
          {/* Tombol Masak */}
          <button onClick={() => handleTugasClick('masak')} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-green-200">
            <span>Icon</span>
            <span className="text-sm font-medium">Masak</span>
          </button>
          {/* Tombol Lain-lain */}
          <button onClick={() => handleTugasClick('lain_lain')} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-green-200">
            <span>Icon</span>
            <span className="text-sm font-medium">Lain-lain</span>
          </button>
        </div>

        {/* Tampilan Detail Petugas (Muncul saat tombol ditekan) */}
        <div className="bg-white p-4 rounded-lg shadow">
          {tugasAktif === 'balai_desa' && (
            <div>
              <h3 className="font-bold mb-2">Petugas di Balai Desa</h3>
              <div className="flex gap-4">
                {jadwalHariIni.tugas.balai_desa.map((petugas: Petugas) => (
                  <div key={petugas.nama} className="text-center">
                    <img src={petugas.foto} alt={petugas.nama} className="w-16 h-16 rounded-full object-cover mx-auto" />
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
                    <img src={petugas.foto} alt={petugas.nama} className="w-16 h-16 rounded-full object-cover mx-auto" />
                    <p>{petugas.nama}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Untuk "Lain-lain" bisa ditambahkan input form di sini */}
          {tugasAktif === 'lain_lain' && (
             <div>
               <h3 className="font-bold mb-2">Jadwal Tentatif</h3>
               <p>Belum ada jadwal yang diinput.</p>
               {/* Tambahkan form input/select box di sini */}
             </div>
          )}
        </div>

        {/* Bagian Progress Proker */}
        <h2 className="text-xl font-bold mt-8 mb-2">PROGRESS PROKER</h2>
        <div className="grid grid-cols-2 gap-4">
          {prokerData.map(proker => {
            const progress = hitungProgress(proker);
            return (
              // Nantinya, ini bisa jadi Link ke halaman detail proker: <Link href={`/proker/${proker.id}`}>
              <div key={proker.id} className="bg-white rounded-lg shadow overflow-hidden border-4 border-green-400">
                <div className="relative">
                  <img src={proker.gambar} alt={proker.nama} className="w-full h-24 object-cover" />
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">{progress}%</span>
                </div>
                <div className="p-2 flex justify-between items-center bg-gray-50">
                  <p className="font-semibold">{proker.nama}</p>
                  <button className="text-green-600 font-bold text-sm">Buy Now</button> {/* Ganti teksnya jika perlu */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}