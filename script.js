let pesanan = [];
let total = 0;

// TAMBAH MENU
function tambah(nama, harga) {
    pesanan.push({ nama, harga });
    total += harga;
    render();
}

// TAMPILKAN LIST
function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    pesanan.forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.nama} - Rp ${p.harga}`;
        list.appendChild(li);
    });

    // tampilkan total
    document.getElementById("total").innerText = total;
}

// HITUNG KEMBALIAN
document.getElementById("uang").addEventListener("input", function() {
    let uang = parseInt(this.value) || 0;
    let kembali = uang - total;

    document.getElementById("kembalian").value = kembali >= 0 ? kembali : "Uang kurang";
});

// SELESAI PESANAN
function selesai() {
    if (pesanan.length === 0) return alert("Belum ada pesanan!");

    kirimData();

    alert("Pesanan selesai!");

    pesanan = [];
    total = 0;

    document.getElementById("uang").value = "";
    document.getElementById("kembalian").value = "";
    document.getElementById("total").innerText = 0;

    render();
}

// KIRIM KE GOOGLE SHEETS
async function kirimData() {

    const url = "https://script.google.com/macros/s/AKfycbxjX4DoVn8vZUGLXmgT5sAVTF1CAArVWS5PI7v6aQ8LVupQkFm7XMypRfjA6Xqtwws/exec";

    let data = pesanan.map(p => ({
        nama: p.nama,
        harga: p.harga
    }));
console.log(data);
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });
}