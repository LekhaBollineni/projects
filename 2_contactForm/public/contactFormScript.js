document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("statusMessage");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate form data
        if(!data.firstName || !data.lastName || !data.phoneNumber || !data.email) {
            status.textContent = "Please fill in all fields.";
            status.style.color = "red";
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if(!phoneRegex.test(data.phoneNumber)) {
            status.textContent = "Phone number must be 10 digits.";
            status.style.color = "red";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(data.email)) {
            status.textContent = "Invalid email address.";
            status.style.color = "red";
            return;
        }

        try{
            const res= await fetch("/submit",{
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });

            const result = await res.json();
            status.textContent = result.message;
            status.style.color = res.ok ? "green" : "red";

            if (res.ok){
                form.reset();
                setTimeout(() => {
                    status.textContent = "";
                }, 3000);
            }
        } catch (err) {
            console.error("Submission error: ",err);
            status.textContent = "An error occurred. Please try again.";
            status.style.color = "red";
        }

        
    });

    });