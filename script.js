let pesanan = [];
let total = 0;

function tambah(nama, harga) {
    pesanan.push({ nama, harga });
    total += harga;
    render();
}

function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    pesanan.forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.nama} - Rp ${p.harga}`;
        list.prepend(li);
    });

    document.getElementById("total").innerText = total;
}

document.getElementById("uang").addEventListener("input", function () {
    let uang = parseInt(this.value) || 0;
    let kembali = uang - total;

    document.getElementById("kembalian").value =
        kembali >= 0 ? kembali : "Uang kurang";
});

aasync function kirimData(nama) {

    const url = "https://script.google.com/macros/s/AKfycbwsJ9mmGrnR8df2aTpxxfhqFaoRGkX9vgE53LG5sPtxZaypzenjkkvh2eDiaDzOHk-i/exec";

    let data = {
        nama: nama,
        pesanan: pesanan,
        total: total
    };

    await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

function selesai() {

    let nama = document.getElementById("nama").value;

    if (!nama) return alert("Masukkan nama!");
    if (pesanan.length === 0) return alert("Kosong!");

    kirimData(nama);

    alert("Berhasil!");

    pesanan = [];
    total = 0;

    document.getElementById("nama").value = "";
    document.getElementById("uang").value = "";
    document.getElementById("kembalian").value = "";
    document.getElementById("total").innerText = 0;

    render();
}