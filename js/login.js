// Hiển thị form đăng ký
function showRegister() {
    document.getElementById('loginfrom').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Hiển thị form đăng nhập
function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginfrom').style.display = 'block';
}

// Đăng ký
function register() {
    const fullName = document.querySelector('#registerForm input[placeholder="Nhập họ tên"]').value;
    const email = document.querySelector('#registerForm input[placeholder="Nhập email"]').value;
    const username = document.querySelector('#registerForm input[placeholder="Nhập tài khoản"]').value;
    const password = document.querySelector('#registerForm input[placeholder="Nhập mật khẩu"]').value;
    const confirmPassword = document.querySelector('#registerForm input[placeholder="Nhập lại mật khẩu"]').value;

    if (!fullName || !email || !username || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === username)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    const newUser = { fullName, email, username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
    showLogin();
}

// Đăng nhập
function login() {
    const username = document.querySelector('#loginfrom input[placeholder="Nhập tài khoản"]').value;
    const password = document.querySelector('#loginfrom input[placeholder="Nhập mật khẩu"]').value;

    if (!username || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        window.location.href = "/index.html"; // chuyển về trang chủ
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

// Khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginfrom").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
});
