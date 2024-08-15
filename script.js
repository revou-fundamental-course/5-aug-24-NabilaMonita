document.getElementById('bmiForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Menghentikan pengiriman form untuk validasi

    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const weightInput = document.getElementById('weight');

    // Menghapus kelas error dan pesan kesalahan dari semua input
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    [heightInput, ageInput, weightInput].forEach(input => input.classList.remove('error'));

    let valid = true;

    // Validasi tinggi badan
    if (!heightInput.value) {
        heightInput.classList.add('error');
        document.getElementById('height-error').textContent = 'Mohon tinggi badan diisi';
        valid = false;
    }

    // Validasi usia
    if (!ageInput.value) {
        ageInput.classList.add('error');
        document.getElementById('age-error').textContent = 'Mohon usia diisi';
        valid = false;
    }

    // Validasi berat badan
    if (!weightInput.value) {
        weightInput.classList.add('error');
        document.getElementById('weight-error').textContent = 'Mohon berat badan diisi';
        valid = false;
    }

    // Jika semua input valid, lanjutkan perhitungan BMI
    if (valid) {
        const height = parseFloat(heightInput.value) / 100; // Konversi cm ke meter
        const weight = parseFloat(weightInput.value);
        const age = parseInt(ageInput.value);
        const gender = document.querySelector('input[name="gender"]:checked').value;

        // Hitung BMI
        const bmi = weight / (height * height);

        // Tentukan kategori BMI
        let resultText = '';
        let resultClass = '';

        if (bmi < 18.5) {
            resultClass = 'normal';
            resultText = `BMI Anda adalah ${bmi.toFixed(2)} (Kekurangan Berat Badan).`;
            resultText += '<br><br>Untuk meningkatkan berat badan, pertimbangkan untuk menambah asupan kalori dan meningkatkan frekuensi makan.';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            resultClass = 'normal';
            resultText = `BMI Anda adalah ${bmi.toFixed(2)} (Normal).`;
            resultText += '<br><br>Anda berada dalam rentang berat badan ideal. Pertahankan pola makan sehat dan olahraga teratur.';
        } else if (bmi >= 25.0 && bmi < 29.9) {
            resultClass = 'overweight';
            resultText = `BMI Anda adalah ${bmi.toFixed(2)} (Kelebihan Berat Badan).`;
            resultText += '<br><br>Untuk menurunkan berat badan, fokuslah pada pengaturan kalori makanan dan tingkatkan aktivitas fisik Anda.';
        } else {
            resultClass = 'obese';
            resultText = `BMI Anda adalah ${bmi.toFixed(2)} (Obesitas).`;
            resultText += '<br><br>Obesitas dapat meningkatkan risiko beberapa penyakit. Disarankan untuk berkonsultasi dengan dokter dan melakukan perubahan besar dalam pola makan dan gaya hidup.';
        }
        resultText += '<br><br>BMI tidak sepenuhnya mewakili diagnosis menyeluruh dari kesehatan tubuh dan resiko penyakit seseorang. Anda perlu konsultasi lebih lanjut mengenai resiko dan kekhawatiran Anda terkait dengan berat badan Anda.';

        // Tampilkan hasil
        const bmiResult = document.getElementById('bmiResult');
        bmiResult.innerHTML = resultText;
        bmiResult.className = `result-container ${resultClass}`;

        // Sembunyikan teks "Keunggulan Fitur"
        document.getElementById('feature-info').style.display = 'none';
        document.getElementById('feature-info-2').style.display = 'none';

        // Tampilkan tombol download
        document.getElementById('downloadBtn').style.display = 'block';
    }
});

// Hapus kelas error saat pengguna mulai mengetik
document.querySelectorAll('#bmiForm input').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
        const errorEl = document.getElementById(`${this.id}-error`);
        if (errorEl) {
            errorEl.textContent = '';
        }
    });
});

// Event listener untuk form reset
document.getElementById('bmiForm').addEventListener('reset', function () {
    // Tampilkan kembali teks "Keunggulan Fitur"
    document.getElementById('feature-info').style.display = 'block';
    document.getElementById('feature-info-2').style.display = 'block';

    // Kosongkan hasil BMI dan sembunyikan tombol download
    const bmiResult = document.getElementById('bmiResult');
    bmiResult.innerHTML = '';
    bmiResult.className = 'result-container';

    // Sembunyikan tombol download
    document.getElementById('downloadBtn').style.display = 'none';

    // Menghapus kelas error dan pesan kesalahan dari semua input
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('#bmiForm input').forEach(input => input.classList.remove('error'));
});


// Download PDF
document.getElementById('downloadBtn').addEventListener('click', function () {
    const bmiResult = document.getElementById('bmiResult').innerText;
    const blob = new Blob([bmiResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hasil-bmi.txt';
    a.click();
    URL.revokeObjectURL(url);
});