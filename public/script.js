// public/script.js
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  const status = document.getElementById('status');
  status.textContent = 'Processing...';

  try {
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      status.textContent = '✅ Booking successful! Check WhatsApp.';
      this.reset();
    } else {
      status.textContent = '❌ Something went wrong. Please try again.';
    }
  } catch (error) {
    console.error(error);
    status.textContent = '❌ Error connecting to server.';
  }
});
