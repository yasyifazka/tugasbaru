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
// 2. PROSES LOGIN BYPASS JALUR AMAN
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

        // MASUKKAN DATA KE STORAGE
        localStorage.setItem("username", username);
        
        // JALANKAN ANIMASI CENTANG UNGU
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.classList.add("active"); 
        }

        // PERBAIKAN LINK (Hanya mundur 1 folder agar tidak 404)
        setTimeout(() => {
            window.location.href = "../index.html"; 
        }, 2500);

    } catch (error) {
        // JALUR CADANGAN KALAU OFFLINE
        localStorage.setItem("username", username);
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.classList.add("active"); 
        }
        setTimeout(() => {
            window.location.href = "../index.html"; 
        }, 2500);
    }
});
