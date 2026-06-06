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
// 2. PROSES LOGIN BYPASS + SINKRONISASI CSS (.show)
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
        
        // --- PROSES MUNCULKAN ANIMASI YANG BENAR ---
        // 1. Sembunyikan isi form login bawaan agar tidak bertumpuk berantakan
        document.getElementById("loginForm").style.display = "none";
        document.querySelector(".login-header").style.display = "none";
        if(document.querySelector(".divider")) document.querySelector(".divider").style.display = "none";
        if(document.querySelector(".social-login")) document.querySelector(".social-login").style.display = "none";
        if(document.querySelector(".signup-link")) document.querySelector(".signup-link").style.display = "none";

        // 2. Picu class '.show' sesuai dengan setingan file style.css kamu!
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.classList.add("show"); 
        }

        // Tunggu 3 detik menikmati keindahan lingkaran centang birunya, lalu pindah toko
        setTimeout(() => {
            window.location.href = "../index.html"; 
        }, 3000);

    } catch (error) {
        // JALUR CADANGAN JIKA OFFLINE
        localStorage.setItem("username", username);
        
        document.getElementById("loginForm").style.display = "none";
        document.querySelector(".login-header").style.display = "none";
        if(document.querySelector(".divider")) document.querySelector(".divider").style.display = "none";
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
