// Highlight active nav link on scroll or click
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".main-nav .nav-link");

    // Smooth scroll offset handling for sticky header
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove("active"));
                    this.classList.add("active");
                }
            }
        });
    });

    // Optional: observer to highlight active nav link on scroll
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // ── Contact Form ──────────────────────────────────────────────
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const formStatus = document.getElementById("formStatus");

    const fields = {
        name: {
            el: document.getElementById("name"),
            errorEl: document.getElementById("nameError"),
            validate(v) {
                if (!v.trim()) return "Nimi on pakollinen";
                if (v.trim().length < 2) return "Nimen täytyy olla vähintään 2 merkkiä";
                return "";
            }
        },
        email: {
            el: document.getElementById("email"),
            errorEl: document.getElementById("emailError"),
            validate(v) {
                if (!v.trim()) return "Sähköposti on pakollinen";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Syötä kelvollinen sähköpostiosoite";
                return "";
            }
        },
        phone: {
            el: document.getElementById("phone"),
            errorEl: document.getElementById("phoneError"),
            validate(v) {
                if (!v.trim()) return "";
                if (!/^\+?[\d\s\-()]{7,}$/.test(v.trim())) return "Syötä kelvollinen puhelinnumero";
                return "";
            }
        },
        message: {
            el: document.getElementById("message"),
            errorEl: document.getElementById("messageError"),
            validate(v) {
                if (!v.trim()) return "Viesti on pakollinen";
                if (v.trim().length < 10) return "Viestin täytyy olla vähintään 10 merkkiä";
                return "";
            }
        }
    };

    function setFieldError(field, errorMsg) {
        if (errorMsg) {
            field.el.classList.add("invalid");
            field.errorEl.textContent = errorMsg;
        } else {
            field.el.classList.remove("invalid");
            field.errorEl.textContent = "";
        }
    }

    // Validate on blur and input
    Object.values(fields).forEach(field => {
        field.el.addEventListener("blur", () => setFieldError(field, field.validate(field.el.value)));
        field.el.addEventListener("input", () => {
            if (field.el.classList.contains("invalid")) {
                setFieldError(field, field.validate(field.el.value));
            }
        });
    });

    function showStatus(type, message) {
        formStatus.className = "form-status " + type;
        formStatus.textContent = message;
        formStatus.hidden = false;
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        formStatus.hidden = true;

        let valid = true;
        Object.values(fields).forEach(field => {
            const err = field.validate(field.el.value);
            setFieldError(field, err);
            if (err) valid = false;
        });

        if (!valid) return;

        // Simulate submission
        submitBtn.disabled = true;
        btnText.hidden = true;
        btnLoading.hidden = false;

        // Collect form data
        const data = {
            name: fields.name.el.value.trim(),
            email: fields.email.el.value.trim(),
            phone: fields.phone.el.value.trim(),
            message: fields.message.el.value.trim()
        };

        console.log("Lomake lähetetty:", data);

        // Simulate network delay
        await new Promise(r => setTimeout(r, 1500));

        // Success
        btnText.hidden = false;
        btnLoading.hidden = true;
        submitBtn.disabled = false;
        form.reset();
        showStatus("success", "Kiitos viestistäsi! Olemme sinuun yhteydessä pian.");
    });
});
