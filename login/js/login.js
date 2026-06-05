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
        showSuccess(data.username);
    } else {
        alert("Username / Password salah");
    }
});

function showSuccess(username) {
    const form = document.querySelector(".login-form");
    const divider = document.querySelector(".divider");
    const social = document.querySelector(".social-login");
    const signup = document.querySelector(".signup-link");

    // sembunyikan elemen login
    form.style.display = "none";
    divider.style.display = "none";
    social.style.display = "none";
    signup.style.display = "none";

    // tampilkan welcome message
    const box = document.getElementById("successMessage");
    box.style.display = "block";

    // ubah teks (opsional)
    box.querySelector("h3").innerText = "Welcome back!";
    box.querySelector("p").innerText = username;
        }
