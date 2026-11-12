    // ── Color Testing Section ─────────────────────────────────────
    const colors = [
        { name: "Fiesta", hex: "#DD4132" },
        { name: "Jester Red", hex: "#9E1030" },
        { name: "Turmeric", hex: "#FE840E" },
        { name: "Living Coral", hex: "#FF6F61" },
        { name: "Pink Peacock", hex: "#C62168" },
        { name: "Pepper Stem", hex: "#8D9440" },
        { name: "Aspen Gold", hex: "#FFD662" },
        { name: "Princess Blue", hex: "#00539C" },
        { name: "Toffee", hex: "#755139" },
        { name: "Mango Mojito", hex: "#D69C2F" },
        { name: "Terrarium Moss", hex: "#616247" },
        { name: "Sweet Lilac", hex: "#E8B5CE" },
        { name: "Soybean", hex: "#D2C29D" },
        { name: "Eclipse", hex: "#343148" },
        { name: "Sweet Corn", hex: "#F0EAD6" },
        { name: "Brown Granite", hex: "#615550" }
    ];

    let activeSurfaceId = "surface1";
    const surfaceStates = {
        surface1: { color: null, name: "Ei valittua väriä" },
        surface2: { color: null, name: "Ei valittua väriä" }
    };

    const colorGrid = document.getElementById("colorGrid");
    const surface1 = document.getElementById("surface1");
    const surface2 = document.getElementById("surface2");
    const info1 = document.getElementById("info1");
    const info2 = document.getElementById("info2");
    const activeSurfaceName = document.getElementById("activeSurfaceName");
    const resetColorsBtn = document.getElementById("resetColorsBtn");

    if (colorGrid) {
        colors.forEach(c => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "color-btn";
            btn.style.backgroundColor = c.hex;
            btn.setAttribute("aria-label", c.name);

            const tooltip = document.createElement("span");
            tooltip.className = "color-tooltip";
            tooltip.textContent = `${c.name} (${c.hex})`;
            btn.appendChild(tooltip);

            btn.addEventListener("click", () => {
                applyColorToActiveSurface(c);
            });

            colorGrid.appendChild(btn);
        });
    }

    window.setActiveSurface = function(surfaceId) {
        activeSurfaceId = surfaceId;
        if (surfaceId === "surface1") {
            surface1.classList.add("active-target");
            surface2.classList.remove("active-target");
            activeSurfaceName.textContent = "Pinta 1 (Pääseinä)";
        } else {
            surface2.classList.add("active-target");
            surface1.classList.remove("active-target");
            activeSurfaceName.textContent = "Pinta 2 (Tehosteseinä / Katto)";
        }
    };

    // Initialize surface 1 as active by default
    setActiveSurface("surface1");

    function applyColorToActiveSurface(colorObj) {
        surfaceStates[activeSurfaceId] = { color: colorObj.hex, name: `${colorObj.name} (${colorObj.hex})` };
        
        const bgId = activeSurfaceId === "surface1" ? "bg1" : "bg2";
        const infoId = activeSurfaceId === "surface1" ? "info1" : "info2";
        const bgEl = document.getElementById(bgId);
        const infoEl = document.getElementById(infoId);

        if (bgEl) {
            bgEl.style.backgroundColor = colorObj.hex;
        }
        if (infoEl) {
            infoEl.textContent = `${colorObj.name} (${colorObj.hex})`;
        }
    }

    if (resetColorsBtn) {
        resetColorsBtn.addEventListener("click", () => {
            surfaceStates.surface1 = { color: null, name: "Ei valittua väriä" };
            surfaceStates.surface2 = { color: null, name: "Ei valittua väriä" };

            const bg1 = document.getElementById("bg1");
            const bg2 = document.getElementById("bg2");

            if (bg1) bg1.style.backgroundColor = "transparent";
            if (bg2) bg2.style.backgroundColor = "transparent";

            info1.textContent = "Ei valittua väriä";
            info2.textContent = "Ei valittua väriä";
        });
    }

    function isDarkColor(hex) {
        const c = hex.substring(1);
        const rgb = parseInt(c, 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma < 100;
    }
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

    // ── Lightbox Gallery ──────────────────────────────────────────
    window.openLightbox = function(element) {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightboxImg");
        const lightboxCaption = document.getElementById("lightboxCaption");
        const img = element.querySelector("img");
        const title = element.querySelector(".gallery-title");

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title ? title.textContent : img.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById("lightbox");
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    };

    // Close lightbox on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });
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
