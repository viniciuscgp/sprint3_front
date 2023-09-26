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
        update_menu();
    });

});

function setup_all() {
    activate_menu(2);
    let elem_btn_register = document.getElementById("btn_register");

    elem_btn_register.addEventListener('click', async (ev) => {
        ev.preventDefault();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password1 = document.getElementById('password1').value;
        let password2 = document.getElementById('password2').value;

        if ((name == "") || (email == "") || (password1 == "") || (password2 == "")) {
            $('#errorModalMessage').html("You need to fill all fields");
            $('#errorModal').modal('show');

            setTimeout(() => {
                $('#errorModal').modal('hide');
            }, 3000);
            return;
        }

        if (password1 !== password2) {
            document.getElementById('password1').value = ""
            document.getElementById('password2').value = ""

            $('#errorModalMessage').html("Passwords doesn't match!");
            $('#errorModal').modal('show');

            setTimeout(() => {
                $('#errorModal').modal('hide');
            }, 3000);
            return;
        }

        // Validar dados aqui, se necessário...

        let userData = {
            name: name,
            email: email,
            password: password1,
        };

        try {
            let response = await fetch('http://127.0.0.1:5002/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            let result = await response.json();
            window.location.href = "welcome.html";
        } catch (error) {
            console.error("Erro ao registrar o usuário:", error);
        }
    });
}

