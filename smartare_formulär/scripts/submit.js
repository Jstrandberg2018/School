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
            statusText.textContent = "Formuläret innehåller felaktiga fält. Kontrollera felen nedan.";
            statusText.classList.remove("hidden");
            statusText.style.color = "red";

            // Scrolla till första ogiltiga input
            const firstInvalid = Object.values(window.fields).find(input => input.classList.contains("invalid"));
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            return;
        }

        statusText.textContent = "Skickar...";
        statusText.classList.remove("hidden");
        statusText.style.color = "#5e4b8b";

        const formData = new FormData(form);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const success = false; // Ändra till true för att simulera lyckad submission

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
