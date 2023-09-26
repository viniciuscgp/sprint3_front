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

var myCodeMirror;
let current_filename = get_new_file_name();

const highlighters = {
    "python": "python",
    "c": "clike",
    "java": "clike"
}

const new_file_names = {
    "python": "noname.py",
    "c": "noname.c",
    "java": "noname.java"
}

const examples = {
    "python": python_example,
    "c": c_example,
    "java": java_example
}

const extension_lang = {
    ".py": "python",
    ".c": "c",
    ".java": "java"
}

function setup_all() {
    var elem_lang = document.getElementById("lang");
    var elem_theme = document.getElementById("theme");
    var elem_run = document.getElementById("run");
    var elem_code = document.getElementById("code");
    var elem_line_numbers = document.getElementById("line_numbers");
    var elem_indent_unit = document.getElementById("indent_unit");

    var elem_btn_save = document.getElementById("btn_save");
    var elem_btn_new = document.getElementById("btn_new");
    var elem_btn_share = document.getElementById("btn_share");
    var elem_btn_mysources = document.getElementById("btn_mysources");

    activate_menu(0);

    elem_run.disabled = false;

    // ADD LISTENER TO THE BUTTONS
    //-------------------------------------------------------------------
    elem_run.addEventListener("click", run_script);
    elem_lang.addEventListener("change", () => setup_codemirror(true));
    elem_theme.addEventListener("change", () => setup_codemirror(false));
    elem_line_numbers.addEventListener("change", () => setup_codemirror(false));
    elem_indent_unit.addEventListener("change", () => setup_codemirror(false));

    elem_btn_save.addEventListener("click", save_code);
    elem_btn_new.addEventListener("click", new_code);
    elem_btn_share.addEventListener("click", share_twitter);
    elem_btn_mysources.addEventListener("click", show_sources);


    myCodeMirror = CodeMirror.fromTextArea(elem_code, {
        mode: "python",
        lineNumbers: true,
    });

    myCodeMirror.setSize(null, "100%");

    myCodeMirror.on("cursorActivity", update_status);

    setup_codemirror(true);

    // RUN THE CODE
    //------------------------------------------------------------------
    async function run_script() {

        let code_to_run = myCodeMirror.getValue();
        let elem_output = document.getElementById("output");
        let elem_input = document.getElementById("input");

        let elem_cpu_time = document.getElementById("cpu_time");
        let elem_memory = document.getElementById("memory");

        let lang = elem_lang.options[elem_lang.selectedIndex].value.toLowerCase();

        // CALL MY PROXY API THAT CALL THE REAL API THAT WILL DO THE JOB
        //--------------------------------------------------------------
        elem_output.value = "";
        const url = 'http://127.0.0.1:5001/compile';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                language: lang,
                code: code_to_run,
                input: elem_input.value
            })
        };

        try {
            elem_run.innerHtml = "Wait..."
            const response = await fetch(url, options);
            const result = await response.json();
            elem_run.innerHtml = "Run"

            let cpu_time_v = result.time;
            let memory_v = result.memory;
            let output = result.output;
            let error = result.stderr;

            if (error) {
                output = error;
                elem_output.classList.add("text-danger")
            } else
                elem_output.classList.remove("text-danger")

            elem_cpu_time.innerText = "CPU TIME: " + cpu_time_v
            elem_memory.innerText = "MEMORY: " + memory_v

            elem_output.value = output;
        } catch (error) {
            elem_run.innerHtml = " <span class='d-none d-sm-inline'>Run</span>"
            console.error(error);
        }
    }

    // Code Mirror Component I use to highlithg sintaxe
    //------------------------------------------------------------------
    function setup_codemirror(load_example) {

        lang = elem_lang.options[elem_lang.selectedIndex].value.toLowerCase();
        theme = elem_theme.options[elem_theme.selectedIndex].value;
        console.log(lang)
        current_filename = get_new_file_name();

        myCodeMirror.setOption("theme", theme);
        myCodeMirror.setOption("mode", highlighters[lang]);
        myCodeMirror.setOption("indentUnit", elem_indent_unit.value);
        myCodeMirror.setOption("tabSize", elem_indent_unit.value);
        myCodeMirror.setOption("readOnly", false);
        myCodeMirror.setOption("indentWithTabs", false);
        myCodeMirror.setOption("lineNumbers", elem_line_numbers.checked);
        myCodeMirror.setOption("lineWrapping", false);
        myCodeMirror.setOption("lineNumbers", elem_line_numbers.checked);

        current_filename = get_new_file_name();

        if (load_example)
            examples[lang]()


    }

}

async function save_code() {
    var elem_btn_save = document.getElementById("btn_save");

    try {
        const new_filename = await ask_for_string("Save file ?", current_filename);
        current_filename = new_filename;
    } catch (error) {
        return;  // Reject.
    }

    const url = 'http://127.0.0.1:5000/files';
    let jwtToken = get_current_token();
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            file_content: myCodeMirror.getValue(),
            file_name: current_filename,
            tags: "projets"
        })
    };

    try {
        elem_btn_save.innerText = "Saving..."
        const response = await fetch(url, options);
        if (response.status === 403) {
            window.location.href = '/login.html';
            return;
        }
        const result = await response.json();
    } catch (error) {
        console.error(error);
    } finally {
        elem_btn_save.innerHTML = "<i class=\"px-2 fas fa-play\"></i>Save"
        update_status();
        show_sources();
    }

}

function update_status() {
    var cursor = myCodeMirror.getCursor();
    var line = cursor.line + 1;
    var column = cursor.ch + 1;
    document.getElementById("statusbar").textContent = "Ln: " + line + " -- Col: " + column;
    document.getElementById("filename-display").textContent = current_filename;
}

function share_twitter() {
    const tweetText = "Eu estou usando a CleanIDE!";
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
}

function new_code() {
    current_filename = get_new_file_name();
    myCodeMirror.setValue("")
    update_status();
}

async function show_sources() {
    try {
        console.log("Getting user files...");
        let myfiles = await get_user_files(get_current_token());
        updateFileButtons(myfiles)
    } catch (error) {
        console.error('Error getting the user files:', error);
    }
}

async function get_user_files(token) {
    const url = 'http://127.0.0.1:5000/files';
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
        return result;
    } catch (error) {
        console.log('error message:' + error);
        veryfy_if_forbidden();
    } finally {

    }
}

function get_new_file_name() {
    const new_file_names = {
        "python": "source.py",
        "c": "source.c",
        "java": "source.java"
    }
    let elem_lang = document.getElementById("lang");
    let lang = elem_lang.options[elem_lang.selectedIndex].value.toLowerCase();
    return new_file_names[lang];
}

function updateFileButtons(myfiles) {
    const fileStyles = {
        '.py': {
            backgroundImage: 'linear-gradient(45deg, #306998, #3b8ddc)',
            iconClass: 'fas fa-file-code'  // ícone genérico de código para Python
        },
        '.c': {
            backgroundImage: 'linear-gradient(45deg, #444, #666)',
            iconClass: 'fas fa-file-alt'  // ícone genérico de arquivo para C
        },
        '.java': {
            backgroundImage: 'linear-gradient(45deg, #b7410e, #f36d0a)',
            iconClass: 'fab fa-java'  // ícone do Java
        }
        // Adicione mais estilos conforme necessário
    };
    const container = document.querySelector('.d-flex.flex-wrap');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    myfiles.forEach(file => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'file-wrapper m-1';  // Adicionado para estilização, se necessário

        const extension = "." + get_file_extension(file.file_name);
        const style = fileStyles[extension] || { backgroundImage: 'gray' };

        // Botão de arquivo
        const fileBtn = document.createElement('button');
        fileBtn.className = 'file-btn  btn btn-sm';
        fileBtn.style.backgroundImage = style.backgroundImage;


        const icon = document.createElement('i');
        icon.className = style.iconClass || 'fas fa-file';
        fileBtn.appendChild(icon);

        const text = document.createTextNode(` ${file.file_name}`);
        fileBtn.appendChild(text);

        fileBtn.title = `Click to open ${file.file_name}`;
        fileBtn.setAttribute('data-fileid', file.id);
        fileBtn.onclick = function () {
            const file_id = this.getAttribute('data-fileid');
            load_user_file_content(get_current_token(), file_id);
        };

        wrapperDiv.appendChild(fileBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm file-delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.title = `Delete ${file.file_name}`;
        deleteBtn.setAttribute('data-filename', file.file_name);

        deleteBtn.onclick = function () {
            const file_name = this.getAttribute('data-filename');
            remove_user_file(get_current_token(), file_name);
        };

        wrapperDiv.appendChild(deleteBtn);
        container.appendChild(wrapperDiv);
    });
}

async function remove_user_file(token, filename) {

    ask_question("Do you REALLY want to DELETE the file ?").then(async () => {
        const url = `http://127.0.0.1:5000/files?file_name=${encodeURIComponent(filename)}`;
        const options = {
            method: 'DELETE',
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
            result = await response.json();
            show_sources();
        } catch (error) {
            console.log('error message:' + error);
        } finally {

        }
    });


}

async function load_user_file_content(token, file_id) {
    let elem_lang = document.getElementById("lang");
    const url = `http://127.0.0.1:5000/file/${file_id}`;
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
        myCodeMirror.setValue(result.file_content);
        current_filename = result.file_name;
        set_language_based_on_extension(elem_lang, extension_lang, "." + get_file_extension(current_filename));
        update_status();
    } catch (error) {
        console.log('error message:' + error);
    } finally {

    }
}

function python_example() {

    code = [];
    code.push("def fibonacci(n):")
    code.push("   fib_sequence = [0, 1]")
    code.push("   while len(fib_sequence) <= n:")
    code.push("      fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])")
    code.push("   return fib_sequence")
    code.push("n = 10")
    code.push("print(fibonacci(n))")

    myCodeMirror.setValue(code.join("\n"));
}
function c_example() {

    code = [];
    code.push("#include<stdio.h>");
    code.push("");
    code.push("int main(void)");
    code.push("{");
    code.push("   printf(\"Hello World\");");
    code.push("   return 0;")
    code.push("}");

    myCodeMirror.setValue(code.join("\n"));
}
function java_example() {

    code = [];
    code.push("public class Hello{");
    code.push("   public static void main(String[] args)");
    code.push("   {");
    code.push("      System.out.println(\"Hello World from Java\");");
    code.push("   }")
    code.push("}")

    myCodeMirror.setValue(code.join("\n"));
}