document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

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
        showSuccess();
    } else {
        alert("Username / Password salah");
    }
});

function showSuccess() {
    // sembunyikan form login
    document.querySelector(".login-form").style.display = "none";
    document.querySelector(".divider").style.display = "none";
    document.querySelector(".social-login").style.display = "none";
    document.querySelector(".signup-link").style.display = "none";

    // tampilkan success message
    const success = document.getElementById("successMessage");
    success.classList.add("show");
}
