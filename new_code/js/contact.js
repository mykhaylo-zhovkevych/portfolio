const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// used tools: https://sweetalert2.github.io/#download and https://app.elasticemail.com/marketing/ and https://smtpjs.com/

function sendEmail() {
    const bodyMessage = `Full Name : ${fullName.value}<br> Email: ${email.value}<br> 
    Phone Number:  ${phone.value}<br> Message is: ${message.value}<br> `; 

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "mzovkevic@gmail.com",
        Password : "D3902B2C7308B7796766DE8316FA6B74277E",
        To : "mzovkevic@gmail.com",
        From : "mzovkevic@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if(message == "OK") {
            Swal.fire({
                title: "Thank You! / Danke!",
                text: "Your request will be processed within 1 week! / Ihre Anfrage wird innerhalb von 1 Woche bearbeitet!",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for(const item of items) {
        if(item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        } 

        if(items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if(item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex =  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if(!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != "" ) {
            errorTxtEmail.innerText = "Enter a valid email address";
        }
        else {
            errorTxtEmail.innerText = "Email can't be blank";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") 
    && !phone.classList.contains("error")  && !subject.classList.contains("error")
    && !message.classList.contains("error") ) {
        /* console.log("OK"); */
        sendEmail();

        form.reset();
        return false;
    }

});