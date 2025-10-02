
        // Här kommer din JavaScript-kod
        
        // 1. Ändra bakgrundsfärg
        // TODO: Skapa en funktion som ändrar bakgrundsfärg när knappen klickas
        
        //Hämtar knappen
        const button = document.getElementById("colorButton");

        //Eventlistner, ser om knappen trycks
        button.addEventListener("click", function() {
                //Genererar färgen
                const randomColor = getRandomColor();

                document.body.style.backgroundColor = randomColor;
        });

        //Funktion för att generera färg
        function getRandomColor() {
                const letters = "0123456789ABCDEF";
                let color = "#";
                for (let i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
        }

        // 2. Personlig hälsning
        // TODO: Skapa en funktion som visar en hälsning med användarens namn
        
        //Hämtar från Html
        const greetButton = document.getElementById("greetButton");
        const nameInput = document.getElementById("nameInput");
        const greetingOutput = document.getElementById("greetingOutput");

        //Eventlistner, för knappen
        greetButton.addEventListener("click", function() {
                //Hämtar inputen
                const name = nameInput.value;
                
                //Kollar ifall namn är skrivet
                if (name) {
                        //Skapar hälsningen
                        greetingOutput.textContent = `Hej, ${name}!`;
                } else {
                        greetingOutput.textContent = "Vänligen skriv ditt namn!";
                }
        });

        // 3. Räknare
        // TODO: Skapa en funktion som ökar räknaren när knappen klickas
        
        //Hämtar från Html
        const counterButton = document.getElementById("counterButton");
        const clickCountElement = document.getElementById("clickCount");

        //Startvärde
        let clickCount = 0

        //Eventlistener, för knappen
        counterButton.addEventListener("click", function() {
                //Ökar värde
                clickCount++;
                
                //Uppdaterar texten
                clickCountElement.textContent = clickCount;
        });