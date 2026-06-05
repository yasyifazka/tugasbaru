alert("JS NYALA");
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
    console.log(data);
    alert(JSON.stringify(data));

    if (data.status === "success") {
        localStorage.setItem("username", data.username);
        showSuccess(data.username);
    } else {
        alert("Username / Password salah");
    }
});

function showSuccess(username) {
    document.body.innerHTML = `
        <div style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.8);
            display:flex;
            justify-content:center;
            align-items:center;
            color:white;
            font-size:20px;
            flex-direction:column;
            font-family:sans-serif;
        ">
            <h1>Welcome back!</h1>
            <p>${username}</p>
        </div>
    `;
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

<script src="login.js"></script>
