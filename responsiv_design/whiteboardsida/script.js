const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');
const popup = document.getElementById('popupMessage');
const closePopupBtn = document.getElementById('closePopup');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (form.checkValidity()) {
    // Visa popup
    popup.classList.remove('hidden');
    statusMessage.textContent = '';
    form.reset();
  } else {
    statusMessage.textContent = 'Vänligen fyll i alla fält korrekt.';
    statusMessage.style.color = 'red';
  }
});

// Stäng popup när knappen klickas
closePopupBtn.addEventListener('click', function() {
  popup.classList.add('hidden');
});
