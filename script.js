let pesanan = [];
let total = 0;

// TAMBAH MENU
function tambah(nama, harga) {
    pesanan.push({ nama, harga });
    total += harga;
    render();
}

// RENDER
function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

 [...pesanan].reverse().forEach(p => {
    let li = document.createElement("li");
    li.textContent = `${p.nama} - Rp ${p.harga}`;
    list.appendChild(li);
});

    document.getElementById("total").innerText = total;
    
    
}

// HITUNG KEMBALIAN
document.getElementById("uang").addEventListener("input", function() {
    let uang = parseInt(this.value) || 0;
    let kembali = uang - total;

    document.getElementById("kembalian").value = kembali >= 0 ? kembali : "Uang kurang";
});

// KIRIM DATA
async function kirimData(namaPelanggan) {

    const url = "https://script.google.com/macros/s/AKfycbz-2CScdMbDusrFvJ2Hkx4-cJvL4rA-HB0EROOnv8pw6QR5lePpAhJIFizRgY_NpsDSZg/exec";

    let data = {
        pelanggan: namaPelanggan,
        pesanan: pesanan,
        total: total
    };

    console.log("DATA DIKIRIM:", data);

    try {
        let res = await fetch(url, {
            method: "POST",
            mode: "no-cors", // 🔥 ini kunci kalau masih gagal
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("REQUEST TERKIRIM");

    } catch (error) {
        console.error("ERROR:", error);
    }
}

// SELESAI
function selesai() {

    let namaPelanggan = document.getElementById("namaPelanggan").value;

    if (!namaPelanggan) {
        alert("Masukkan nama pelanggan!");
        return;
    }

    if (pesanan.length === 0) {
        alert("Belum ada pesanan!");
        return;
    }

    kirimData(namaPelanggan);

    alert("Pesanan selesai!");

    // RESET
    pesanan = [];
    total = 0;

    document.getElementById("namaPelanggan").value = "";
    document.getElementById("uang").value = "";
    document.getElementById("kembalian").value = "";
    document.getElementById("total").innerText = 0;

    render();
}

