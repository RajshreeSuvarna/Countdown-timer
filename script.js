const startButton = document.getElementById('start-button');
const dateInput = document.getElementById('date-input');
const countdownDisplay = document.getElementById('countdown');

let timerInterval;

startButton.addEventListener('click', () => {
  const targetDate = new Date(dateInput.value);

  if (isNaN(targetDate)) {
    alert('Please enter a valid date and time!');
    return;
  }

  clearInterval(timerInterval); 

  timerInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      countdownDisplay.textContent = "Time's up!";
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    countdownDisplay.textContent = `${days} Days : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;
  }, 1000);
});