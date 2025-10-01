document.addEventListener("DOMContentLoaded", () => {
  let track = document.getElementById("slide-track");
  let slides = document.querySelectorAll("#slide-track img");
  let n = slides.length;
  let i = 0;
  let intervalId;

  function showSlide(index) {
    track.style.transform = "translateX(" + (-index * 100) + "%)";
  }

  function resetAutoplay() {
    clearInterval(intervalId);  // xóa interval cũ
    autoplay();                 // bật lại từ đầu
  }

  function next() {
    i = (i + 1) % n;
    showSlide(i);
    resetAutoplay(); // reset khi người dùng bấm
  }

  function back() {
    i = (i - 1 + n) % n;
    showSlide(i);
    resetAutoplay(); // reset khi người dùng bấm
  }

  function autoplay() {
    intervalId = setInterval(() => {
      i = (i + 1) % n;
      showSlide(i);
    }, 3000);
  }

  // gán hàm cho nút
  window.next = next;
  window.back = back;

  // khi trang load xong
  showSlide(i);
  autoplay();
});

document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (currentUser) {
        // Tách họ tên theo khoảng trắng
        const parts = currentUser.fullName.trim().split(" ");
        // Lấy phần cuối cùng (tên)
        const lastName = parts[parts.length - 1];
        
        document.getElementById("accountName").textContent = lastName;
    }
});

