document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

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
            localStorage.setItem("username", data.username);
            showSuccess(data.username);
        } else {
            alert("Username / Password salah");
        }

    } catch (error) {
        console.error("ERROR LOGIN:", error);
        alert("Server bermasalah / koneksi gagal");
    }
});

function showSuccess(username) {
    const form = document.querySelector(".login-form");

    // sembunyikan form
    form.style.display = "none";

    // tampilkan welcome
    const box = document.getElementById("successMessage");
    box.style.display = "block";

    // isi username
    const userText = document.getElementById("userText");
    if (userText) {
        userText.innerText = username;
    }
}
