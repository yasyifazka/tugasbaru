document.getElementById("loginForm").addEventListener("submit", async function(e) {
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
            showLoginSuccessAndRedirect(data.username);
        } else {
            showError("Username atau Password salah");
        }

    } catch (error) {
        showError("Terjadi kesalahan koneksi");
    }
});


// ========================
// ERROR FUNCTION
// ========================
function showError(message) {
    let alertBox = document.getElementById("alertBox");

    if (!alertBox) {
        alertBox = document.createElement("div");
        alertBox.id = "alertBox";
        alertBox.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4d4d;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-family: sans-serif;
        `;
        document.body.appendChild(alertBox);
    }

    alertBox.innerText = message;
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}


// ========================
// SUCCESS OVERLAY + REDIRECT
// ========================
function showLoginSuccessAndRedirect(username) {
    const overlay = document.createElement("div");

    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        z-index: 9999;
        font-family: sans-serif;
        animation: fadeIn 0.4s ease;
    `;

    overlay.innerHTML = `
        <div style="text-align:center;">
            <div style="
                width:60px;
                height:60px;
                border:4px solid white;
                border-top:4px solid transparent;
                border-radius:50%;
                animation: spin 1s linear infinite;
                margin:0 auto 20px;
            "></div>

            <h2>Welcome back, ${username}</h2>
            <p>Redirecting to homepage...</p>
        </div>
    `;

    document.body.appendChild(overlay);

    // animasi redirect smooth
    setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.transition = "0.5s";

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 500);

    }, 1500);

    // inject animation CSS
    if (!document.getElementById("loginAnim")) {
        const style = document.createElement("style");
        style.id = "loginAnim";
        style.innerHTML = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}
