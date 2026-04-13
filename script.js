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
    generateQR();
}

// KEMBALIAN
document.getElementById("uang").addEventListener("input", function () {
    let uang = parseInt(this.value) || 0;
    let kembali = uang - total;

    document.getElementById("kembalian").value =
        kembali >= 0 ? kembali : "Uang kurang";
});

// QR
function generateQR() {
    let qr = document.getElementById("qrcode");
    qr.innerHTML = "";

    if (total <= 0) return;

    new QRCode(qr, {
        text: "Total Bayar: Rp " + total,
        width: 120,
        height: 120
    });
}

// KIRIM DATA (FIX UTAMA)
async function kirimData(nama) {

    const url = "https://script.google.com/macros/s/AKfycbxjX4DoVn8vZUGLXmgT5sAVTF1CAArVWS5PI7v6aQ8LVupQkFm7XMypRfjA6Xqtwws/exec";

    let data = {
        pelanggan: nama,
        pesanan: pesanan,
        total: total
    };

    try {
        await fetch(url, {
            method: "POST",
            mode: "no-cors", // penting
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

    } catch (e) {
        console.error(e);
    }
}

// SELESAI
function selesai() {

    let nama = document.getElementById("nama").value;

    if (!nama) return alert("Masukkan nama pelanggan!");
    if (pesanan.length === 0) return alert("Belum ada pesanan!");

    kirimData(nama);

    alert("Pesanan berhasil!");

    // RESET
    pesanan = [];
    total = 0;

    document.getElementById("nama").value = "";
    document.getElementById("uang").value = "";
    document.getElementById("kembalian").value = "";
    document.getElementById("total").innerText = 0;
    document.getElementById("qrcode").innerHTML = "";

    render();
}