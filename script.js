// buka undangan
function openInvitation() {
  document.getElementById("opening").classList.add("hidden");
  document.getElementById("content").classList.remove("hidden");
  document.getElementById("music").play();
}

// ambil nama dari URL
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
  document.getElementById("guestName").innerText = guest;
  document.getElementById("name").value = guest;
}

// countdown
const eventDate = new Date("April 20, 2026 10:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const d = eventDate - now;

  const days = Math.floor(d / (1000 * 60 * 60 * 24));
  const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("countdown").innerHTML = `${days} Hari ${hours} Jam`;
}, 1000);

// RSVP ke WhatsApp
function sendRSVP() {
  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;

  const phone = "6281234567890"; // GANTI NOMOR KAMU

  const message = `Halo, saya ${name}, konfirmasi: ${status}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

// musik
function toggleMusic() {
  const music = document.getElementById("music");
  music.paused ? music.play() : music.pause();
}
