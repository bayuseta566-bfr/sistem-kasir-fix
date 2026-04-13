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

    [...pesanan].reverse().forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.nama} - Rp ${p.harga}`;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

document.getElementById("uang").addEventListener("input", function () {
    let uang = parseInt(this.value) || 0;
    let kembali = uang - total;
    document.getElementById("kembalian").value =
        kembali >= 0 ? kembali : "Uang kurang";
});

async function kirimData(nama) {
    const url = "https://script.google.com/macros/s/AKfycbzN3ZWkkUPy_I3EMjEBZGekHJ0dRxh_RVEcLJjBza0bELoX4DXw-7F3FArAfuWymFmOBQ/exec";

    let data = {
        pelanggan: nama,
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

    if (!nama) return alert("Isi nama!");
    if (pesanan.length === 0) return alert("Belum ada pesanan!");

    kirimData(nama);

    alert("Selesai!");

    pesanan = [];
    total = 0;

    document.getElementById("nama").value = "";
    document.getElementById("uang").value = "";
    document.getElementById("kembalian").value = "";

    render();
}

