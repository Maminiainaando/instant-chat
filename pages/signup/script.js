const names = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const gender = document.getElementById("gender");
const fileInput = document.getElementById('photo');
const register = document.getElementById("register");

register.addEventListener("click", async (event) => {
  event.preventDefault();

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('username', names.value);
  formData.append('email', email.value);
  formData.append('gender', gender.value);
  formData.append('password', password.value);
  if (file) {
    formData.append('image_user', file);
  }

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Signup successful. User ID: ${data.id_user}`);
      window.location.href = "http://localhost:3001/pages/login"; 
    } else {
      const errorData = await response.json();
      alert(`Failed to sign up: ${errorData.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    alert('Failed to sign up');
  }
});
