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

    pesanan.forEach(p => {
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

    const url = "https://script.google.com/macros/s/AKfycbwtYWJ0bCVCY9JSVT5hIT5qP31fSgw9QebonGiWKgc4VTNoV1e_6Lpw80rj3G8rmnVt/exec";

    let data = pesanan.map(p => ({
        pelanggan: namaPelanggan,
        nama: p.nama,
        harga: p.harga
    }));

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });
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