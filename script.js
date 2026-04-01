// Buka undangan dan mulai animasi transisi
function openInvitation() {
  const opening = document.getElementById("opening");
  const content = document.getElementById("content");
  const body = document.body;
  
  // Efek transisi smooth out
  opening.style.opacity = '0';
  opening.style.transform = 'translateY(-50px) scale(0.95)';
  
  // Mainkan musik (Wajib lewat interaksi user)
  const music = document.getElementById("music");
  const icon = document.getElementById("musicIcon");
  
  if (music) {
    music.play()
      .then(() => {
        if(icon) icon.innerText = "🎵";
      })
      .catch(err => {
        console.log("Audio play dicegah oleh browser:", err);
        if(icon) icon.innerText = "🔇";
      });
  }

  // Tampilkan konten dan lepas lock scroll
  setTimeout(() => {
    opening.classList.add("hidden");
    content.classList.remove("hidden");
    body.classList.remove("locked"); // Allow scrolling
    // Trigger scroll observer sedikit delay agar animasinya pas
    setTimeout(() => {
      content.style.opacity = '1';
      observeElements();
    }, 100);
  }, 800);
}

// Ambil parameter nama tamu dari URL (?to=Nama)
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
  const guestNameElement = document.getElementById("guestName");
  const nameInput = document.getElementById("name");
  
  if(guestNameElement) guestNameElement.innerText = guest;
  if(nameInput) nameInput.value = guest;
}

// Countdown Timer Acara yang Dioptimalkan
const eventDate = new Date("April 20, 2026 10:00:00").getTime();
let countdownInterval;

function initCountdown() {
  const countdownEl = document.getElementById("countdown");
  if(!countdownEl) return;

  // Render initial skeleton once
  countdownEl.innerHTML = `
    <div class="cd-box"><span class="cd-num" id="cd-days">0</span><span class="cd-text">Hari</span></div>
    <div class="cd-box"><span class="cd-num" id="cd-hours">0</span><span class="cd-text">Jam</span></div>
    <div class="cd-box"><span class="cd-num" id="cd-minutes">0</span><span class="cd-text">Menit</span></div>
    <div class="cd-box"><span class="cd-num" id="cd-seconds">0</span><span class="cd-text">Detik</span></div>
  `;

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMinutes = document.getElementById("cd-minutes");
  const elSeconds = document.getElementById("cd-seconds");

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
      elDays.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
      elHours.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      elMinutes.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      elSeconds.innerText = Math.floor((distance % (1000 * 60)) / 1000);
    } else {
      clearInterval(countdownInterval);
      countdownEl.innerHTML = `<div class="cd-box" style="width: 100%"><span class="cd-num">Acara</span><span class="cd-text">Sedang Berlangsung</span></div>`;
    }
  }, 1000);
}

// Inisialisasi countdown
initCountdown();

// RSVP WhatsApp Handler
function sendRSVP() {
  const name = document.getElementById("name").value.trim();
  const status = document.getElementById("status").value;

  if(!name) {
    alert("Mohon isi nama lengkap Anda.");
    return;
  }
  
  if(!status) {
    alert("Mohon pilih konfirmasi kehadiran Anda.");
    return;
  }

  const phone = "6281234567890"; // Ganti nomor di sini

  const message = `Halo, saya *${name}*. Saya mengonfirmasi bahwa saya *${status}* pada acara pernikahan Anda. Terima kasih!`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

// Toggle Musik (Play/Pause)
function toggleMusic() {
  const music = document.getElementById("music");
  const icon = document.getElementById("musicIcon");
  
  if(music.paused) {
    music.play();
    icon.innerText = "🎵";
  } else {
    music.pause();
    icon.innerText = "🔇";
  }
}

// Intersection Observer (Scroll Reveal Animation)
function observeElements() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    threshold: 0.15, // Pemicu saat 15% elemen terlihat
    rootMargin: "0px 0px -50px 0px" // Pemicu sebelum sampai dasar banget
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Hanya animasi 1x
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}
