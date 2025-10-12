document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const statusText = document.getElementById("formStatus");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        let allValid = true;
        for (let key in window.fields) {
            const valid = window.validateField(key);
            if (!valid) {
                allValid = false;
            }
        }

        if (!allValid) {
    const errorContainer = document.getElementById("allErrors");
    errorContainer.innerHTML = ""; // Rensa gamla fel
    errorContainer.classList.remove("hidden");

    const errors = [];

    for (let key in window.fields) {
        const input = window.fields[key];
        const errorElem = document.getElementById("error-" + input.id);
        if (errorElem && errorElem.textContent) {
            errors.push(`<li>${errorElem.textContent}</li>`);
        }
    }

    if (errors.length > 0) {
        errorContainer.innerHTML = `<ul>${errors.join("")}</ul>`;
    }

    statusText.textContent = "Formuläret innehåller fel. Se nedan.";
    statusText.classList.remove("hidden");
    statusText.style.color = "red";

    // Scrolla ner till felmeddelandena
    errorContainer.scrollIntoView({ behavior: "smooth", block: "center" });

    return;
}

        statusText.textContent = "Skickar...";
        statusText.classList.remove("hidden");
        statusText.style.color = "#5e4b8b";

        const formData = new FormData(form);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const success = true; // Ändra till true för att simulera lyckad submission

            document.getElementById("allErrors").classList.add("hidden");
            document.getElementById("allErrors").innerHTML = "";

            if (!success) {
                throw new Error("Något gick fel vid fiktiv inlämning.");
            }

            statusText.textContent = "Formuläret skickades! (Simulerat)";
            statusText.style.color = "green";
            form.reset();

            Object.values(window.fields).forEach(input => {
                input.classList.remove("valid", "invalid");
                const errElem = input.parentElement.querySelector(".error-message");
                if (errElem) errElem.textContent = "";
            });

        } catch (error) {
            statusText.textContent = `Fel vid skickande: ${error.message}. Försök igen.`;
            statusText.style.color = "red";
        }
    });
});
