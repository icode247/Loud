var form = document.getElementById("loginForm");
var password = document.getElementById("password");
var email = document.getElementById("email");

function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "0");
    return str.trim();
}

async function subForm() {
    var password = form['password'];
    if (!validateEmail(email)) {
        email.classList.remove('valid')
        email.classList.add('invalid')
        email_msg.innerHTML = "Enter your email."

    } else if (!check_pass(password)) {
        password.classList.add('invalid')
        password.classList.remove('valid')
        pass_msg.innerHTML = "Enter your password."

    } else {
        //send a request to the server after all due validations and sanitisations...
        let userEmail = email.value;
        let userPass = sanitizeString(password.value);
        var response = await fetch("/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userEmail,
                password: userPass,
            })
        }).then(res => res.json())
        if (response.msg == "invalid") {
            email.classList.add('invalid')
            password.classList.add('invalid')
            email.classList.remove('valid')
            password.classList.remove('valid')
            pass_msg.innerHTML = "Incorrect email or password."
        } else { 
                window.location.href = '/feedback'
        }
    }

}
function validateEmail(email) {
    email.classList.add('invalid')
    email.classList.remove('valid')
    var emailval = email.value;
    email_msg.innerHTML = "Enter a valid email"
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(emailval).toLowerCase())) {
        email_msg.innerHTML = "";
        email.classList.remove('invalid')
        return true
    } else {
        email_msg.innerHTML = "Enter a valid email";
        email.classList.add('invalid')
        return false
    };
}
function check_pass(input) {
    let val = input.value;
    pass_msg.innerHTML = ""
    input.classList.add('invalid')
    if (val != "") {
        input.classList.remove("invalid")
        input.classList.remove("valid")
        return true
    }

    else {
        return false;
    }
}

password.addEventListener("keyup", () => {
    check_pass(password)
})
email.addEventListener("keyup", () => {
    validateEmail(email)
})
form.addEventListener("submit", (e) => {
    e.preventDefault();
    subForm();
})