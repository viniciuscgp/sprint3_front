/**
 * CleanIDE - Super simple and clean way to test come code 
 * Author   - Vinicius Cesar
 * Obs      - This small software was made for the last Sprint of 
 *            PUC-RJ FullStack POS Graduation course.
 * Date     - 15/08/2023
 */
document.addEventListener("DOMContentLoaded", () => {
    $(document).ready(function () {
        setup_all();
    });

});

function setup_all() {
    activate_menu(1);
    logout();
    var elem_email = document.getElementById("email");
    var elem_password = document.getElementById("password");
    var elem_btn_login = document.getElementById("btn_login");

    elem_btn_login.addEventListener("click", login);

    async function login(e) {
        e.preventDefault();

        const url = 'http://127.0.0.1:5002/login';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: elem_email.value,
                password: elem_password.value
            })
        };

        try {
            elem_btn_login.innerText = "wait..."
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            token = result['token'];
            username = await get_user_name(token);
            console.log(username);
            set_current_token(token);
            set_current_username(username);
            window.location.href = "/index.html";

        } catch (error) {
            set_current_token(null);
            set_current_username(null);
            show_erro("error-message", "Credenciais inválidas !");
        } finally {
            elem_btn_login.innerHTML = "Login"
        }

    }
}


