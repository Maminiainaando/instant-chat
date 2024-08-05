document.addEventListener('DOMContentLoaded', function() {
    const email = document.getElementById("email");
    const names = document.getElementById("name");
    const password = document.getElementById("password"); 
    const login = document.getElementById("login");
    
    login.addEventListener("click", async () => {
        try {
            event.preventDefault();

            const data = {
                username: names.value,
                password: password.value
            };
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResponse = await response.json();

            if (jsonResponse !== null) {
                localStorage.setItem('username',jsonResponse.username);
                window.location.href = "http://localhost:3001";
            } else {
                console.log(jsonResponse);
                alert('Failed to log in. Please check your credentials.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to log in. Please try again later.');
        }
    });
});
