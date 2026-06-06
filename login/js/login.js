// ==========================================
// 1. FITUR TOMBOL MATA (SHOW/HIDE PASSWORD)
// ==========================================
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", function(e) {
        e.preventDefault(); // Mencegah form tersubmit otomatis saat ikon mata diklik
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
}

// ==========================================
// 2. PROSES LOGIN KE API SERVER & TRIGER ANIMASI
// ==========================================
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Menahan halaman agar tidak refresh kosong!

    // Membaca ID "email" di HTML kamu sebagai input Username
    const usernameField = document.getElementById("email");
    const username = usernameField.value.trim();
    const password = passwordInput.value.trim();

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            // Simpan session login di browser
            localStorage.setItem("username", data.username);
            
            // Panggil id kotak "Welcome back!" yang sudah ada di HTML kamu
            const successMsg = document.getElementById("successMessage");
            if (successMsg) {
                successMsg.classList.add("active"); // Memunculkan animasinya ke layar
            }

            // Beri jeda 2.5 detik untuk animasi sukses, lalu otomatis pindah ke toko utama
            setTimeout(() => {
                // Mundur dua tingkat folder (../../) untuk kembali ke root index toko utama
                window.location.href = "../../index.html"; 
            }, 2500);
             
        } else {
            alert("Username atau Password salah, silahkan coba lagi");
        } 
    } catch (error) {
        console.error("Error login:", error);
        alert("Terjadi gangguan koneksi ke server API.");
    }
});
