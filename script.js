let keranjang = [];
let total = 0;

function tambahKeKeranjang(nama, harga) {
    let item = keranjang.find(p => p.nama === nama);

    if (item) {
        item.qty++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            qty: 1
        });
    }

    renderKeranjang();
}

function renderKeranjang() {
    let tbody = document.getElementById("keranjang");
    tbody.innerHTML = "";
    total = 0;

    keranjang.forEach((item, index) => {
        let subtotal = item.harga * item.qty;
        total += subtotal;

        let row = `
<tr>
    <td>
        ${item.nama}<br>
        <small>x${item.qty}</small>
    </td>

    <td>Rp ${item.harga * item.qty}</td>

    <td class="aksi">
        <button class="btn-minus" onclick="kurangiQty(${index})">−</button>
        <button class="btn-plus" onclick="tambahQty(${index})">+</button>
        <button class="btn-hapus" onclick="hapusItem(${index})">Hapus</button>
    </td>
</tr>
`;

        tbody.innerHTML += row;
    });

    document.getElementById("total").textContent = total;
}

function tambahQty(index) {
    keranjang[index].qty++;
    renderKeranjang();
}

function kurangiQty(index) {
    keranjang[index].qty--;

    if (keranjang[index].qty <= 0) {
        keranjang.splice(index, 1);
    }

    renderKeranjang();
}


function hapusItem(index) {
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

    let nomorPesanan = Math.floor(1000 + Math.random() * 9000);

    let detailPesanan = keranjang.map((item, i) => {
    return `${i + 1}. ${item.nama} x${item.qty} = Rp ${item.harga * item.qty}`;
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

    let nomorBarista = "628812479186"; // nomor barista

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


