document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

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

    // Lyssnare för realtidsvalidering
    for (let key in fields) {
        fields[key].addEventListener("input", () => validateField(key));
    }

    function validateField(field) {
        const input = fields[field];
        const value = input.value.trim();
        let isValid = false;

        switch (field) {
            case "firstName":
            case "lastName":
                isValid = value.length >= 2;
                break;
            case "email":
                isValid = emailRegex.test(value);
                break;
            case "password":
                isValid = value.length >= 6;
                updatePasswordStrength(value);
                break;
            case "confirmPassword":
                isValid = value === fields["password"].value && value !== "";
                break;
            case "age":
                const ageNum = parseInt(value);
                isValid = !isNaN(ageNum) && ageNum >= 18 && ageNum <= 100;
                break;
        }

        // Visuell feedback
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

    // Förhindra inlämning om något är fel
    form.addEventListener("submit", function (e) {
        let allValid = true;

        for (let key in fields) {
            const valid = validateField(key); // kör validering igen
            if (!valid) {
                allValid = false;
            }
        }

        if (!allValid) {
            e.preventDefault(); // Stoppa inlämning
            alert("Formuläret innehåller felaktiga uppgifter. Kontrollera alla fält.");
        }
    });

    window.validateField = validateField;
    window.fields = fields;
});
