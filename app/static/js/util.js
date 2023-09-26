function current_page() {
    return window.location.pathname.split("/").pop();
}

function activate_menu(pos) {
    let items = document.getElementsByClassName("nav-item");

    [...items].forEach(element => {
        element.classList.remove('active');
    });

    items[pos].classList.add('active');

}

function show_erro(id, message) {
    let errorMessageElement = document.getElementById(id);
    errorMessageElement.classList.remove("d-none");
    errorMessageElement.classList.add("d-block");

    errorMessageElement.textContent = message;
    setTimeout(function () {
        errorMessageElement.textContent = "";
        errorMessageElement.classList.remove("d-block");
        errorMessageElement.classList.add("d-none");
    }, 2000);
}

function set_current_token(tk) {
    sessionStorage.setItem('token', tk);
}

function get_current_token() {
    return sessionStorage.getItem('token');
}

function set_current_username(name) {
    sessionStorage.setItem('user_name', name);
}

function logout() {
    set_current_token(null);
    set_current_username(null);
}

function get_current_username() {
    let name = sessionStorage.getItem('user_name');
    if (name === null || name === "null") return "Guest";
    return name;
}

function update_menu() {
    let elem_username = document.getElementById("username_menu");

    let elem_btn_save = document.getElementById("btn_save");
    let elem_btn_new = document.getElementById("btn_new");
    let elem_btn_share = document.getElementById("btn_share");
    let elem_btn_mysources = document.getElementById("btn_mysources");

    let elem_menu_login = document.getElementById("menu_login");



    elem_btn_save.disabled = !is_logged();
    elem_btn_new.disabled = false;
    elem_btn_share.disabled = !is_logged();
    elem_btn_mysources.disabled = !is_logged();

    let username = get_current_username();
    elem_username.textContent = username;

    if (is_logged()) {
        elem_menu_login.textContent = "Logout"
    } else {
        elem_menu_login.textContent = "Login"

    }
}

function is_logged() {
    return get_current_username() != "Guest" ? true : false;
}

async function get_user_name(token) {
    const url = 'http://127.0.0.1:5002/user';
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result.name;
    } catch (error) {
        console.log(error);
    } finally {

    }
}

function ask_for_string(labelText, defaultvalue) {
    return new Promise((resolve, reject) => {

        document.querySelector('#saveFileModalLabel').textContent = labelText;
        document.querySelector('#filenameInput').value = defaultvalue;

        function handleSaveClick() {
            const filename = document.getElementById('filenameInput').value;
            if (filename) {
                resolve(filename);  // Resolver a promessa com o nome do arquivo
                saveFileModal.hide();
            } else {
                alert("Por favor, forneça um nome válido.");
            }

            // Remover o evento após ser usado para evitar múltiplos manipuladores
            document.getElementById('saveFileButton').removeEventListener('click', handleSaveClick);
        }

        function handleCancelClick() {
            reject();
            document.getElementById('cancelButton').removeEventListener('click', handleCancelClick);
            saveFileModal.hide();
        }

        // Adicionar manipulador de eventos ao botão
        document.getElementById('saveFileButton').addEventListener('click', handleSaveClick);
        document.getElementById('cancelButton').addEventListener('click', handleCancelClick);

        // Mostrar o modal
        const saveFileModal = new bootstrap.Modal(document.getElementById('saveFileModal'));
        saveFileModal.show();
    });
}

function ask_question(labelText) {
    return new Promise((resolve, reject) => {

        document.querySelector('#modalMessage').textContent = labelText;

        function handleSaveClick() {
            askModal.hide();
            document.getElementById('yesButton').removeEventListener('click', handleSaveClick);
            resolve("OK");
        }

        function handleCancelClick() {
            document.getElementById('noButton').removeEventListener('click', handleCancelClick);
            askModal.hide();
            reject();
        }

        // Adicionar manipulador de eventos ao botão
        document.getElementById('yesButton').addEventListener('click', handleSaveClick);
        document.getElementById('noButton').addEventListener('click', handleCancelClick);

        // Mostrar o modal
        const askModal = new bootstrap.Modal(document.getElementById('askQuestionModal'));
        askModal.show();
    });
}

function is_collapsed(elem) {
    return (window.getComputedStyle(elem).display === 'none') || (window.getComputedStyle(elem).visibility === 'hidden');
}

function collapse(elem) {
    elem.classList.add('d-none');
}

function uncollapse(elem) {
    elem.classList.remove('d-none');
}

function get_file_extension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

function veryfy_if_forbidden() {
    window.location.href = '/login.html';
}

function set_language_based_on_extension(elem, extension_lang, extension) {
    const language = extension_lang[extension];
    if (language) {
        elem.value = language;
    } else {
        console.warn('Extensão desconhecida:', extension);
    }
}
