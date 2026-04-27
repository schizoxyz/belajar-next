"use client";
import { useState } from "react";

export default function Home() {
  const [catatan, setCatatan] = useState([]); // Keranjang catatan
  const [inputan, setInputan] = useState(""); // Tulisan yang sedang diketik
  const [sedangEdit, setSedangEdit] = useState(null); // Menandai mana yang mau diubah

  // 1. TAMBAH & SIMPAN PERUBAHAN
  const simpanCatatan = () => {
    if (inputan.trim() === "") return;

    if (sedangEdit !== null) {
      const updateCatatan = catatan.map((item, index) => 
        index === sedangEdit ? inputan : item
      );
      setCatatan(updateCatatan);
      setSedangEdit(null);
    } else {
      setCatatan([...catatan, inputan]);
    }
    setInputan("");
  };

  // 2. HAPUS
  const hapusCatatan = (id) => {
    setCatatan(catatan.filter((_, index) => index !== id));
  };

  // 3. EDIT (Menaruh teks lama kembali ke kotak ketik)
  const mulaiEdit = (id) => {
    setInputan(catatan[id]);
    setSedangEdit(id);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📝 Papan Tulis Ajaib</h1>
      
      <input 
        value={inputan} 
        onChange={(e) => setInputan(e.target.value)}
        placeholder="Tulis sesuatu di sini..."
      />
      <button onClick={simpanCatatan}>
        {sedangEdit !== null ? "Simpan Perubahan" : "Tambah Catatan"}
      </button>

      <ul>
        {catatan.map((teks, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            {teks} 
            <button onClick={() => mulaiEdit(index)} style={{ marginLeft: "10px" }}>✏️ Edit</button>
            <button onClick={() => hapusCatatan(index)}>🗑️ Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
