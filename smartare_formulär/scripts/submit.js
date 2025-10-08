document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const statusText = document.getElementById("formStatus");

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // 🛑 Stoppa sidomladdning

        // ✅ Kör validering manuellt för alla fält
        let allValid = true;
        for (let key in window.fields) {
            const valid = window.validateField(key);
            if (!valid) {
                allValid = false;
            }
        }

        if (!allValid) {
            statusText.textContent = "Formuläret innehåller felaktiga fält. Kontrollera och försök igen.";
            statusText.classList.remove("hidden");
            statusText.style.color = "red";
            return;
        }

        // 📤 Visa "Skickar..."
        statusText.textContent = "Skickar...";
        statusText.classList.remove("hidden");
        statusText.style.color = "#5e4b8b";

        // 🔄 Förbered data
        const formData = new FormData(form);

        try {
            // 💡 Fejka väntetid med setTimeout + Promise
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // 💡 Fejkat svar (du kan sätta "throw" här om du vill testa fel)
            const success = true; // ändra till false för att testa fel

            if (!success) {
                throw new Error("Något gick fel vid fiktiv inlämning.");
            }

            // ✅ Lyckat "svar"
            statusText.textContent = "Formuläret skickades! (Simulerat)";
            statusText.style.color = "green";
            form.reset();

            // Rensa valideringsklasser
            Object.values(window.fields).forEach(input => {
                input.classList.remove("valid", "invalid");
            });

        } catch (error) {
            // ❌ Simulerat fel
            statusText.textContent = `Fel vid skickande: ${error.message}. Försök igen.`;
            statusText.style.color = "red";
        }
    });
});
