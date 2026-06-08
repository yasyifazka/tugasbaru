// ==========================================
// 1. FITUR TOMBOL MATA (SHOW/HIDE PASSWORD)
// ==========================================
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", function(e) {
        e.preventDefault(); 
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
}

// ==========================================
// 2. PROSES LOGIN BYPASS (SAMA PERSIS FOTO KEDUA)
// ==========================================
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault(); 

    const usernameField = document.getElementById("email");
    const username = usernameField.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        alert("Silakan isi Username dan Password terlebih dahulu!");
        return;
    }

    try {
        // LINK GURU TETAP AMAN DIKIRIMI DATA
        await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        localStorage.setItem("username", username);
        
        // --- ATURAN SAMA PERSIS FOTO KEDUA ---
        // Kita HANYA sembunyikan form input dan tombol bawahnya saja
        document.getElementById("loginForm").style.display = "none";
        if(document.querySelector(".social-login")) document.querySelector(".social-login").style.display = "none";
        if(document.querySelector(".signup-link")) document.querySelector(".signup-link").style.display = "none";

        // Bagian Header (.login-header) TIDAK KITA HAPUS biar logo dan tulisan "Welcome" tetap berdiri di atas!

        // Munculkan animasi suksesnya di bawah tulisan welcome
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.classList.add("show"); 
        }

        // Jeda 3 detik lalu pindah ke halaman toko es krim
        setTimeout(() => {
            window.location.href = "../index.html"; 
        }, 3000);

    } catch (error) {
        // JALUR CADANGAN JIKA OFFLINE
        localStorage.setItem("username", username);
        
        document.getElementById("loginForm").style.display = "none";
        if(document.querySelector(".social-login")) document.querySelector(".social-login").style.display = "none";
        if(document.querySelector(".signup-link")) document.querySelector(".signup-link").style.display = "none";

        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.classList.add("show"); 
        }

        setTimeout(() => {
            window.location.href = "../index.html"; 
        }, 3000);
    }
});
                
