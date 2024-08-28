// Untuk soal
const question = [
  {
    question:
      "Dibawah ini yang bukan termasuk tumbuhan yang berkembang biak secara alami dengan biji adalah …",
    answer: [
      { text: " Pohon Mangga ", correct: false },
      { text: " Jeruk ", correct: false },
      { text: " Semangka ", correct: false },
      { text: " Bambu", correct: true },
    ],
  },
  {
    question: "Tahapan nyamuk setelah dari telur adalah menjadi ?",
    answer: [
      { text: "Nyamuk Dewasa", correct: false },
      { text: "Jentik", correct: true },
      { text: "Naymuk kecil", correct: false },
      { text: "Kepompong", correct: false },
    ],
  },
];

// Mendapatkan elemen-elemen dari halaman web
const questionElement = document.getElementById("question"); // Mendapatkan elemen dengan ID 'question' untuk menampilkan pertanyaan
const answerButton = document.getElementById("answer-button"); // Mendapatkan elemen dengan ID 'answer-button' untuk menampilkan tombol jawaban
const nextButton = document.getElementById("next-btn"); // Mendapatkan elemen dengan ID 'next-btn' untuk tombol 'Next' dan 'Play Again'
const timeLeftElement = document.getElementById("time-left"); // Mendapatkan elemen dengan ID 'time-left' untuk menampilkan waktu tersisa

let currentQuestionIndex = 0; // Variabel untuk melacak indeks pertanyaan saat ini
let score = 0; // Variabel untuk menyimpan skor pengguna
let timeLeft = 10; // Variabel untuk menyimpan waktu tersisa dalam detik
let timer; // Variabel untuk menyimpan ID timer

// Fungsi untuk memulai kuis
function startQuiz() {
  currentQuestionIndex = 0; // Set indeks pertanyaan saat ini ke 0
  score = 0; // Set skor pengguna ke 0
  nextButton.innerHTML = "Next"; // Set teks tombol 'Next'
  resetState(); // Panggil fungsi resetState untuk mengatur ulang tampilan
  showQuestion(); // Panggil fungsi showQuestion untuk menampilkan pertanyaan pertama
}

// Fungsi untuk menampilkan pertanyaan saat ini
function showQuestion() {
  let currentQuestion = question[currentQuestionIndex]; // Ambil pertanyaan saat ini dari array question
  let questionNo = currentQuestionIndex + 1; // Hitung nomor pertanyaan (indeks + 1)
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Tampilkan pertanyaan

  resetState(); // Panggil fungsi resetState untuk mengatur ulang tampilan

  // Iterasi melalui jawaban pertanyaan saat ini dan tambahkan tombol jawaban ke layar
  // Iterasi melalui setiap jawaban untuk pertanyaan saat ini
  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button"); // Membuat elemen tombol baru
    button.innerHTML = answer.text; // Menetapkan teks jawaban ke dalam tombol
    button.classList.add("btn"); // Menambahkan kelas CSS 'btn' ke tombol
    answerButton.appendChild(button); // Menambahkan tombol ke dalam area jawaban

    // Jika jawaban ini benar, tandai data set 'correct' pada tombol
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    // Menambahkan event listener untuk menangani klik pada tombol jawaban
    button.addEventListener("click", selectAnswer);
  });

  startTimer(); // Panggil fungsi startTimer untuk memulai timer
}

// Fungsi untuk mengatur ulang tampilan antara pertanyaan
function resetState() {
  clearInterval(timer); // Hentikan timer
  timeLeft = 10; // Set ulang waktu tersisa ke 10 detik
  updateTimerDisplay(); // Perbarui tampilan waktu
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild); // Hapus semua tombol jawaban sebelumnya
  }
}

// Fungsi untuk menangani saat pengguna memilih jawaban
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // Tandai jawaban yang benar
    score++; // Tambah skor jika jawaban benar
  } else {
    selectedBtn.classList.add("incorrect"); // Tandai jawaban yang salah
  }
  // Men-disable semua tombol jawaban setelah pengguna memilih
  Array.from(answerButton.children).forEach((button) => {
    button.disabled = true;
  });
  nextButton.style.display = "block"; // Tampilkan tombol 'Next'
}

// Fungsi untuk menampilkan skor akhir
function showScore() {
  resetState(); // Panggil fungsi resetState untuk mengatur ulang tampilan
  questionElement.innerHTML = `You score ${score} out of ${question.length}!`; // Tampilkan skor pengguna
  nextButton.innerHTML = "Play Again"; // Ubah teks tombol 'Next' menjadi 'Play Again'
  nextButton.style.display = "block"; // Tampilkan tombol 'Next'
  clearInterval(timer); // Hentikan timer
  timeLeftElement.textContent = "0"; // Set waktu kembali ke 0
}

// Fungsi untuk menangani saat pengguna menekan tombol 'Next'
function handleNextButton() {
  currentQuestionIndex++; // Tambahkan indeks pertanyaan saat ini
  if (currentQuestionIndex < question.length) {
    showQuestion(); // Tampilkan pertanyaan berikutnya
  } else {
    clearInterval(timer); // Hentikan timer saat kuis selesai
    showScore(); // Tampilkan skor akhir
  }
}

// Fungsi untuk memulai timer
function startTimer() {
  clearInterval(timer); // Hentikan timer sebelum memulai yang baru
  timer = setInterval(() => {
    timeLeft--; // Kurangi waktu tersisa setiap detik
    updateTimerDisplay(); // Perbarui tampilan waktu
    if (timeLeft <= 0) {
      clearInterval(timer); // Hentikan timer ketika waktu habis
      handleNextButton(); // Pindah ke pertanyaan berikutnya
    }
  }, 1000); // Interval 1 detik
}

// Fungsi untuk memperbarui tampilan waktu
function updateTimerDisplay() {
  timeLeftElement.textContent = timeLeft;
}

// Event listener untuk tombol 'Next'
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton(); // Panggil fungsi handleNextButton jika masih ada pertanyaan yang tersisa
  } else {
    startQuiz(); // Panggil fungsi startQuiz jika kuis selesai dan tombol 'Play Again' ditekan
  }
});

startQuiz(); // Panggil fungsi startQuiz untuk memulai kuis saat halaman dimuat
