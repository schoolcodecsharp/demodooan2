document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const accountName = document.getElementById("accountName");
  const accountBox = document.querySelector(".icon-box.account");
  const accountMenu = document.getElementById("accountMenu");

  if (currentUser) {
    const parts = currentUser.fullName.trim().split(" ");
    accountName.textContent = parts[parts.length - 1];
    accountBox.removeAttribute("href");

    accountMenu.innerHTML = `
      <li><a href="html/profile.html"><i class="fa fa-user-circle"></i> Thông tin cá nhân</a></li>
      <li><a href="#" id="logoutBtn" class="logout-btn"><i class="fa fa-sign-out"></i> Đăng xuất</a></li>
    `;

    accountBox.addEventListener("click", function (e) {
      e.preventDefault();
      accountMenu.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
      if (!accountBox.contains(e.target)) {
        accountMenu.classList.remove("show");
      }
    });

    document.addEventListener("click", function (e) {
      if (e.target && e.target.id === "logoutBtn") {
        e.preventDefault();
        if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
          localStorage.removeItem("currentUser");
          window.location.href = "../html/login.html";
        }
      }
    });
  } else {
    accountName.textContent = "Tài khoản";
    accountBox.setAttribute("href", "../html/login.html");
    accountMenu.style.display = "none";
  }
});
