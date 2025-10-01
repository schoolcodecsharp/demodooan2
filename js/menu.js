// Xử lý click
document.querySelectorAll(".dropbtn").forEach(btn => {
  btn.addEventListener("click", function () {
    let parent = this.parentElement;

    // Đóng các menu khác
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== parent) d.classList.remove("active");
    });

    // Toggle menu hiện tại
    parent.classList.toggle("active");
  });
});

// Đóng khi click ra ngoài
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
  }
});
