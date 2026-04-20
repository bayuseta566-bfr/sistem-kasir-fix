let pesanan = [];
let total = 0;

function tambah(nama, harga) {
    let item = pesanan.find(p => p.nama === nama);

    if (item) {
        item.qty++;
        item.subtotal += harga;
    } else {
        pesanan.push({
            nama: nama,
            harga: harga,
            qty: 1,
            subtotal: harga
        });
    }

    total += harga;
    render();
}

function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    pesanan.forEach(p => {
        list.innerHTML += `
        <div class="order-item">
            <span>${p.nama} x${p.qty}</span>
            <span>Rp ${p.subtotal}</span>
        </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

document.getElementById("uang").addEventListener("input", function () {
    let uang = parseInt(this.value) || 0;
    let kembali = uang - total;

    document.getElementById("kembalian").value =
        kembali >= 0 ? kembali : "Uang kurang";
});

async function selesai() {

    let namaPelanggan = document.getElementById("namaPelanggan").value;
    if (!namaPelanggan) return alert("Isi nama pelanggan");

    const url = "https://script.google.com/macros/s/AKfycbwGloVG9W59-zqDM4pyOzLuYz6R8iTBtJygIJZM-Usi1m3T5JDuAtVaAOvxX8ZPtYu6/exec";

    for (let item of pesanan) {

        console.log(item);

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                waktu: new Date().toLocaleString(),
                pelanggan: namaPelanggan,
                menu: item.nama,
                qty: item.qty,
                harga: item.harga,
                subtotal: item.subtotal
            })
        });
    }

    alert("Pesanan selesai");

    // RESET
    pesanan = [];
    total = 0;
    document.getElementById("namaPelanggan").value = "";
    document.getElementById("uang").value = "";
    document.getElementById("kembalian").value = "";

    render();
}