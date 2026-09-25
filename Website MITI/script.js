// FUNCTION UNTUK NAVIGASI MULTI-HALAMAN
function switchTab(pageId, event) {
  if (event) event.preventDefault();

  // Sembunyikan semua section
  const sections = document.querySelectorAll(".page-section");
  sections.forEach((sec) => sec.classList.remove("active"));

  // Hilangkan status active dari tombol navigasi
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((btn) => btn.classList.remove("active"));

  // Tampilkan section yang dipilih
  const selectedSection = document.getElementById("page-" + pageId);
  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  // Tandai nav button yang aktif
  if (event && event.target.classList.contains("nav-btn")) {
    event.target.classList.add("active");
  }

  // Scroll halus ke atas
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// INTERACTIVE ASCII ART CANVAS GENERATOR
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("asciiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // Karakter ASCII berdasarkan tingkat kecerahan
  const asciiChars = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"];

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Lacak pergerakan mouse pada canvas
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    targetMouseX = e.clientX - rect.left;
    targetMouseY = e.clientY - rect.top;
  });

  let time = 0;

  function renderASCII() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse movement interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const fontSize = 12;
    const cols = Math.floor(width / fontSize);
    const rows = Math.floor(height / fontSize);

    ctx.font = `${fontSize}px monospace`;

    time += 0.03;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * fontSize;
        const y = r * fontSize;

        // Hitung pengaruh jarak kursor mouse
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseEffect = Math.max(0, (200 - dist) / 200) * 15;

        // Kalkulasi gelombang matematika untuk efek 3D gunung/landform
        const wave1 = Math.sin(c * 0.1 + time) * 10;
        const wave2 = Math.cos(r * 0.15 + time * 0.8) * 8;
        const val =
          Math.sin((c + r) * 0.08 + time) * 10 + wave1 + wave2 + mouseEffect;

        // Tentukan karakter berdasarkan nilai gelombang
        const charIndex = Math.floor(Math.abs(val)) % asciiChars.length;
        const char = asciiChars[charIndex];

        // Warna cerah untuk elemen latar dan biru terang (#085CF0) untuk bagian yang bergerak
        if (val > 6 || mouseEffect > 2) {
          ctx.fillStyle = "#085CF0"; // Bright Blue Aksen Gerak
          ctx.fontWeight = "bold";
        } else if (val > 2) {
          ctx.fillStyle = "#162660"; // Royal Blue
        } else {
          ctx.fillStyle = "rgba(22, 38, 96, 0.25)"; // Soft Muted Blue
        }

        ctx.fillText(char, x, y);
      }
    }

    requestAnimationFrame(renderASCII);
  }

  renderASCII();
});
