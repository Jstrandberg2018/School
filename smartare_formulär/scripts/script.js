document.addEventListener("DOMContentLoaded", function () {
    const fields = {
        firstName: document.getElementById("firstName"),
        lastName: document.getElementById("lastName"),
        email: document.getElementById("email"),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirmPassword"),
        age: document.getElementById("age"),
    };

    const passwordStrengthText = document.getElementById("passwordStrength");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function getErrorMessageElem(input) {
        return input.parentElement.querySelector(".error-message");
    }

    for (let key in fields) {
        fields[key].addEventListener("input", () => validateField(key));
    }

    function validateField(field) {
        const input = fields[field];
        const value = input.value.trim();
        let isValid = false;
        let errorMessage = "";

        switch (field) {
            case "firstName":
                isValid = value.length >= 2;
                if (!isValid) errorMessage = "Förnamn måste vara minst 2 tecken.";
                break;
            case "lastName":
                isValid = value.length >= 2;
                if (!isValid) errorMessage = "Efternamn måste vara minst 2 tecken.";
                break;
            case "email":
                isValid = emailRegex.test(value);
                if (!isValid) errorMessage = "Ogiltig e-postadress.";
                break;
            case "password":
                isValid = value.length >= 6;
                if (!isValid) errorMessage = "Lösenord måste vara minst 6 tecken.";
                updatePasswordStrength(value);
                break;
            case "confirmPassword":
                isValid = value === fields["password"].value && value !== "";
                if (!isValid) errorMessage = "Lösenorden matchar inte.";
                break;
            case "age":
                const ageNum = parseInt(value);
                isValid = !isNaN(ageNum) && ageNum >= 18 && ageNum <= 100;
                if (!isValid) errorMessage = "Åldern måste vara mellan 18 och 100.";
                break;
        }

        const errorElem = getErrorMessageElem(input);
        if (errorElem) {
            errorElem.textContent = isValid ? "" : errorMessage;
        }

        input.classList.toggle("valid", isValid);
        input.classList.toggle("invalid", !isValid);

        return isValid;
    }

    function updatePasswordStrength(password) {
        let strength = "Svagt";
        let color = "red";

        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /\W/.test(password)
        ) {
            strength = "Starkt";
            color = "green";
        } else if (
            password.length >= 6 &&
            (/[A-Z]/.test(password) || /\d/.test(password))
        ) {
            strength = "Medel";
            color = "orange";
        }

        passwordStrengthText.textContent = `Lösenordsstyrka: ${strength}`;
        passwordStrengthText.style.color = color;
    }

    window.validateField = validateField;
    window.fields = fields;
});
