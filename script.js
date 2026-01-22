let keranjang = [];
let total = 0;

function tambahKeKeranjang(nama, harga) {
    keranjang.push({ nama, harga });
    total += harga;
    renderKeranjang();
}

function renderKeranjang() {
    let tbody = document.getElementById("keranjang");
    tbody.innerHTML = "";

    keranjang.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.nama}</td>
                <td>Rp ${item.harga}</td>
                <td>
                    <button class="hapus" onclick="hapusItem(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    document.getElementById("total").textContent = total;
}

function hapusItem(index) {
    total -= keranjang[index].harga;
    keranjang.splice(index, 1);
    renderKeranjang();
}

function kirimPesanan() {
    let nama = document.getElementById("nama").value;
    let meja = document.getElementById("meja").value;

    if (!nama || !meja || keranjang.length === 0) {
        alert("Mohon lengkapi data dan pesanan.");
        return;
    }

    let nomorPesanan = Math.floor(Math.random() * 9000) + 1000;

    alert(
        `Pesanan Berhasil!\n\n` +
        `No. Pesanan: #${nomorPesanan}\n` +
        `Nama: ${nama}\n` +
        `Meja: ${meja}\n` +
        `Total: Rp ${total}\n\n` +
        `Silakan menunggu pesanan Anda.`
    );

    keranjang = [];
    total = 0;
    renderKeranjang();
    document.getElementById("nama").value = "";
    document.getElementById("meja").value = "";
}

function kirimPesanan() {
    let nama = document.getElementById("nama").value;
    let meja = document.getElementById("meja").value;

    if (!nama || !meja || keranjang.length === 0) {
        alert("Mohon lengkapi data dan pesanan.");
        return;
    }

    let nomorPesanan = Math.floor(1000 + Math.random() * 9000);

    let detailPesanan = keranjang.map(item => {
        return `- ${item.nama} (Rp ${item.harga})`;
    }).join("\n");

    let pesan =
`PESANAN BARU - DINE IN

No Pesanan : #${nomorPesanan}
Nama       : ${nama}
No Meja    : ${meja}

Detail Pesanan:
${detailPesanan}

Total Pembayaran:
Rp ${total}

Status : MENUNGGU DIPROSES`;

    let nomorBarista = "628812479186"; // GANTI

    let url =
        "https://wa.me/" +
        nomorBarista +
        "?text=" +
        encodeURIComponent(pesan);

    window.open(url, "_blank");

    keranjang = [];
    total = 0;
    renderKeranjang();
}

