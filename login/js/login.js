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
        showLoginSuccess(data.username);
    } else {
        alert("Username atau Password salah");
    }
});

function showLoginSuccess(username) {
    const overlay = document.createElement("div");

    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.65);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        z-index: 9999;
        font-family: sans-serif;
    `;

    overlay.innerHTML = `
        <div style="text-align:center;">
            <div style="
                width:60px;
                height:60px;
                border:4px solid #fff;
                border-top:4px solid transparent;
                border-radius:50%;
                animation: spin 1s linear infinite;
                margin:0 auto 20px;
            "></div>

            <h2>Welcome back, ${username}</h2>
        </div>
    `;

    document.body.appendChild(overlay);

    if (!document.getElementById("anim")) {
        const style = document.createElement("style");
        style.id = "anim";
        style.innerHTML = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}
