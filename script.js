$(function () {

    $('#nama').text('Ahmad Roja Hakam');
    $('#nim').text('NIM 255150701111005');

    var angkaSekarang = '0';       
    var angkaSebelumnya = null;    
    var operatorDipilih = null;  
    var layarBaru = false;        

    var simbol = {
        '+': '+',
        '-': '\u2212',  
        '*': '\u00d7',   
        '/': '\u00f7'    
    };

    function tampil(teks) {
        if (teks !== undefined) {
            $('#layar').text(teks);
            return;
        }

        if (operatorDipilih !== null) {
            var angkaKedua = layarBaru ? '' : angkaSekarang;
            $('#layar').text(angkaSebelumnya + ' ' + simbol[operatorDipilih] + ' ' + angkaKedua);
        } else {
            $('#layar').text(angkaSekarang);
        }
    }

    function reset() {
        angkaSekarang = '0';
        angkaSebelumnya = null;
        operatorDipilih = null;
        layarBaru = false;
        tampil();
    }

    function hitung() {
        var a = angkaSebelumnya;
        var b = parseFloat(angkaSekarang);
        var hasil;

        if (operatorDipilih === '+') {
            hasil = a + b;
        } else if (operatorDipilih === '-') {
            hasil = a - b;
        } else if (operatorDipilih === '*') {
            hasil = a * b;
        } else if (operatorDipilih === '/') {
            if (b === 0) {
                alert('Tidak bisa dibagi 0');
                reset();
                return false;
            }
            hasil = a / b;
        }

        angkaSekarang = String(parseFloat(hasil.toFixed(8)));
        return true;
    }

    $('.angka').on('click', function () {
        var digit = $(this).text();

        if (layarBaru || angkaSekarang === '0') {
            angkaSekarang = digit;
            layarBaru = false;
        } else {
            angkaSekarang += digit;
        }
        tampil();
    });

    $('#titik').on('click', function () {
        if (layarBaru) {
            angkaSekarang = '0.';
            layarBaru = false;
        } else if (angkaSekarang.indexOf('.') === -1) {
            angkaSekarang += '.';
        }
        tampil();
    });

    $('.operator').on('click', function () {
        if (operatorDipilih !== null && !layarBaru) {
            if (!hitung()) { return; }
        }

        angkaSebelumnya = parseFloat(angkaSekarang);
        operatorDipilih = $(this).attr('data-op');
        layarBaru = true;
        tampil();
    });

    $('#sama').on('click', function () {
        if (operatorDipilih === null) { return; }

        var a = angkaSebelumnya;
        var b = angkaSekarang;
        var simbolDipakai = simbol[operatorDipilih];

        if (!hitung()) { return; }

        var teks = a + ' ' + simbolDipakai + ' ' + b + ' = ' + angkaSekarang;

        operatorDipilih = null;
        layarBaru = true;
        tampil(teks);
    });

    $('#hapus').on('click', function () {
        reset();
    });

});