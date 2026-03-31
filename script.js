// Buka undangan dan mulai animasi transisi
function openInvitation() {
  const opening = document.getElementById("opening");
  const content = document.getElementById("content");
  
  // Efek transisi smooth out
  opening.style.opacity = '0';
  opening.style.transform = 'translateY(-30px)';
  
  // Mainkan musik saat ada interaksi user (wajib sinkron dengan event click agar tidak diblokir browser modern)
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

  setTimeout(() => {
    opening.classList.add("hidden");
    content.classList.remove("hidden");
  }, 600); // Sesuaikan dengan durasi transisi CSS
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

// Countdown Timer Acara
const eventDate = new Date("April 20, 2026 10:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  // Jika waktu belum habis
  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownEl = document.getElementById("countdown");
    if(countdownEl) {
      countdownEl.innerHTML = `
        <div class="cd-box"><span class="cd-num">${days}</span><span class="cd-text">Hari</span></div>
        <div class="cd-box"><span class="cd-num">${hours}</span><span class="cd-text">Jam</span></div>
        <div class="cd-box"><span class="cd-num">${minutes}</span><span class="cd-text">Menit</span></div>
        <div class="cd-box"><span class="cd-num">${seconds}</span><span class="cd-text">Detik</span></div>
      `;
    }
  } else {
    // Jika acara sudah berlangsung
    const countdownEl = document.getElementById("countdown");
    if(countdownEl) {
      countdownEl.innerHTML = `<div class="cd-box"><span class="cd-num">H-Hari</span><span class="cd-text">Acara Sedang Berlangsung</span></div>`;
    }
  }
}, 1000);

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

  const phone = "6281234567890"; // GANTI NOMOR KAMU DI SINI

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
