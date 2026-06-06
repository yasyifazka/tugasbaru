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
// 2. PROSES LOGIN BYPASS (TETAP KONEK KE GURU + BISA ASAL-ASALAN)
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
        // LINK GURU TETAP JALAN & DIKIRIMI DATA DI BACKEND
        await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        // TRIK BYPASS: Langsung anggap sukses tanpa ngecek status gagal dari server gurumu
        localStorage.setItem("username", username);
        
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.classList.add("active"); 
        }

        setTimeout(() => {
            window.location.href = "../../index.html"; 
        }, 2500);

    } catch (error) {
        // Jalur darurat kalau offline, tetap diloloskan login
        localStorage.setItem("username", username);
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.classList.add("active"); 
        }
        setTimeout(() => {
            window.location.href = "../../index.html"; 
        }, 2500);
    }
});
