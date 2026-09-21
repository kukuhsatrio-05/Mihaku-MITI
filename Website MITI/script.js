// 1. Toggle Sidebar (Menu Garis Tiga)
const hamburgerBtn = document.getElementById('hamburger-menu');
const sidebar = document.getElementById('sidebar');

hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// 2. Navigasi Halaman Tanpa Refresh (SPA)
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Atur status menu aktif
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');

        // Ganti halaman konten
        sections.forEach(sec => sec.classList.remove('active-section'));
        const targetId = link.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-section');
        
        // Tutup sidebar di mode HP setelah klik
        if(window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });
});

// 3. Generator Bintang Segi Empat Melengkung Bersinar
const starContainer = document.getElementById('star-container');

function generateStars(totalStars) {
    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.classList.add('sparkle-star');
        
        // Sebar acak secara horizontal (5% hingga 95% lebar)
        const randomX = Math.floor(Math.random() * 90) + 5;
        
        // Fokuskan bintang di area bawah (area gradasi gelap: 40% hingga 90% dari atas)
        const randomY = Math.floor(Math.random() * 50) + 40;
        
        // Variasi ukuran bintang (antara 20px hingga 40px)
        const randomSize = Math.random() * 20 + 20;

        star.style.left = `${randomX}%`;
        star.style.top = `${randomY}%`;
        star.style.width = `${randomSize}px`;
        star.style.height = `${randomSize}px`;
        
        // Delay kedipan acak agar terlihat natural
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 2 + 2}s`;

        starContainer.appendChild(star);
    }
}

// Menghasilkan 12 bintang bercahaya
generateStars(12);