var form = document.getElementById("signupForm");
var password = document.getElementById("password");
var email = document.getElementById("email");
var nameinp = document.getElementById("name");
var regNum = document.getElementById("regNumber");
var password2 = document.getElementById("confirm-password");

function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "0");
    return str.trim();
}

async function subForm() {
    var password = form['password'];
    if (nameinp.value == "") {
        nameinp.classList.add('invalid');
        nameinp.classList.remove("valid")
        name_msg.innerHTML = "Enter your fullname."

    }
    else if (regNumber.value == "") {
        regNumber.classList.add('invalid');
        regNumber.classList.remove('valid')
        reg_msg.innerHTML = "Enter your registration number ."

    }
    else if (!validateEmail(email)) {
        email.classList.remove('valid')
        email.classList.add('invalid')
        email_msg.innerHTML = "Enter your email."

    }
    else if (!check_pass(password)) {
        password.classList.add('invalid')
        password.classList.remove('valid')
        pass_msg.innerHTML = "Enter a valid password."

    }
    else if (!confirmPassword(password, password2)) {
        password2.classList.add('invalid')
        password2.classList.remove('valid')
        pass2_msg.innerHTML = "Password must match."

    }

    else {
        email.classList.add('valid')
        password.classList.add('valid')
        email.classList.remove('invalid')
        password.classList.remove('invalid')

        //send a request to the server after all due validations and sanitisations...
        let name = nameinp.value;
        let reg = regNum.value;
        let userEmail = email.value;
        let userPass = sanitizeString(password.value);
        var response = await fetch("/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                regNumber:reg,
                email: userEmail,
                password: userPass,
            })
        }).then(res => res.json())
        console.log(response)
        if (response.msg == "created") {
            window.location.href = '/auth/signin'
        }else{
            pass2_msg.innerHTML = "Something went wrong, retry"
        }
    }

}
function checkName() {
    if (nameinp.value != "" && typeof (nameinp.value) !== "number") {
        nameinp.classList.add('valid');
        nameinp.classList.remove("invalid")
        name_msg.innerHTML = ""
    } else {
        nameinp.classList.remove("valid")
    }
}
function checkReg() {
    if (regNum.value != "") {
        regNum.classList.add('valid');
        regNum.classList.remove("invalid")
        reg_msg.innerHTML = ""
    } else {
        regNum.classList.remove("valid")
    }
}
async function checkEmailExist(emailVal) {
    let res = await fetch(`/api/checkemail?email=${emailVal}`, {
        headers: {
            "Content-Type": "applciation/json",
            "host": window.location.origin
        },
        method: "GET"
    }).then(res => res.json());
    if (res === null) {
        email.classList.remove('invalid')
    } else {
        email.classList.add('invalid')
        email.classList.remove('valid')
        email_msg.innerHTML = "Account exists with email."
    }

}
function confirmPassword(pass1, pass2) {
    if (pass1.value !== pass2.value) {
        password2.classList.add('invalid')
        password2.classList.remove('valid')
        pass2_msg.innerHTML = "Password must match."
    } else {
        password2.classList.add('valid')
        password2.classList.remove('invalid')
        pass2_msg.innerHTML = ""
    }
    return pass1.value === pass2.value;

}
function validateEmail(email) {
    email.classList.add('invalid')
    var emailval = email.value;
    email_msg.innerHTML = "Enter a valid email"
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(emailval).toLowerCase())) {
        email_msg.innerHTML = "";
        email.classList.remove('invalid')
        email.classList.add('valid')
        return true
    } else {
        email_msg.innerHTML = "Enter a valid email";
        email.classList.add('invalid')
        email.classList.remove('valid')
        return false
    };
}
function check_pass(input) {
    var no = 0;
    let val = input.value;
    pass_msg.innerHTML = ""
    input.classList.add('invalid')
    if (val != "") {
        // If the password length is less than or equal to 6
        if (val.length >= 6) no = 1;

        // If the password length is greater than 6 and contain any lowercase alphabet or any number or any special character
        if (val.length > 6 && (val.match(/[a-z]/) || val.match(/\d+/) || val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))) no = 2;

        // If the password length is greater than 6 and contain alphabet,number,special character respectively
        if (val.length > 6 && ((val.match(/[a-z]/) && val.match(/\d+/)) || (val.match(/\d+/) && val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) || (val.match(/[a-z]/) && val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)))) no = 3;

        // If the password length is greater than 6 and must contain alphabets,numbers and special characters
        if (val.length > 6 && val.match(/[a-z]/) && val.match(/\d+/) && val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) no = 4;


        if (no == 4) {
            input.classList.add("valid")
            return true;
        }
    }

    else {
        input.classList.remove("invalid")
        input.classList.remove("valid")
        return false
    }
}
regNum.addEventListener("keyup", () => {
    checkReg()
})
nameinp.addEventListener("keyup", () => {
    checkName()
})
email.addEventListener("keyup", () => {
    if (email.value != "") {
        checkEmailExist(email.value)
    }
})
password.addEventListener("keyup", () => {
    check_pass(password)
})
password2.addEventListener("keyup", () => {
    if (password2.value != "") {
        confirmPassword(password, password2)
    }
})
email.addEventListener("keyup", () => {
    validateEmail(email)
})
form.addEventListener("submit", (e) => {
    e.preventDefault();
    subForm();
})