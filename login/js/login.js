alert("login.js kebaca");
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
    // sembunyikan form login
    document.getElementById("loginForm").style.display = "none";

    // sembunyikan bagian lain
    document.querySelector(".divider").style.display = "none";
    document.querySelector(".social-login").style.display = "none";
    document.querySelector(".signup-link").style.display = "none";

    // tampilkan welcome box
    const successBox = document.getElementById("successMessage");

    successBox.style.display = "block";
    successBox.classList.add("show");

    successBox.querySelector("h3").textContent =
        `Welcome back, ${username}!`;

    successBox.querySelector("p").textContent =
        "Login berhasil";
}

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
