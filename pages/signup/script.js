document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('username', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('password', document.getElementById('password').value);
  formData.append('image_user', document.getElementById('photo').files[0]);

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      alert('You are ready to login');
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Failed to signup");
  }
});
