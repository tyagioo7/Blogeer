const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("admin-mail").value;
    const password = document.getElementById("admin-password").value;


    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            loginMessage.textContent = data.message;

            return;
        }


        sessionStorage.setItem("adminToken", data.token);

        window.location.href = "admin-dashboard.html";


    } catch (error) {

        console.log(error);

        loginMessage.textContent = "Something went wrong.";

    }

});