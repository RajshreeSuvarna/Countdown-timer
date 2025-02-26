const startButton = document.getElementById('start-button');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const countdownDisplay = document.getElementById('countdown');

let timerInterval;

startButton.addEventListener('click', () => {
  const selectedDate = dateInput.value;
  const selectedTime = timeInput.value;
  
  if (!selectedDate || !selectedTime) {
    alert('Please enter a valid date and time!');
    return;
  }
  
  const targetDateTime = new Date(`${selectedDate}T${selectedTime}`);
  const now = new Date();
  
  if (isNaN(targetDateTime.getTime())) {
    alert('Invalid date or time format!');
    return;
  }
  
  const today = new Date();
  const selectedDay = new Date(selectedDate);
  
  if (selectedDay.toDateString() === today.toDateString() && targetDateTime <= now) {
    alert('Please select a future time today');
    return;
  }

  if (targetDateTime <= now) {
    alert('Please select a future date and time!');
    return;
  }

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = targetDateTime - now;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      countdownDisplay.innerHTML = "<span style='color: red; font-size: 1rem;'>Time's up!</span>";
      const audio = new Audio('ringtone.wav'); 
      audio.play();
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    countdownDisplay.innerHTML = `<h2>Countdown Starts in</h2>
      <div class='countdown-item'><span class='countdown-number'>${days}</span> Days:</div>
      <div class='countdown-item'><span class='countdown-number'>${hours}</span> Hours:</div>
      <div class='countdown-item'><span class='countdown-number'>${minutes}</span> Minutes:</div>
      <div class='countdown-item'><span class='countdown-number'>${seconds}</span> Seconds</div>
    `;
  }, 1000);
});
