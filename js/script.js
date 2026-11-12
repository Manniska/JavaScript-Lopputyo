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

const surfaceNames = {
    surface1: "Pinta 1",
    surface2: "Pinta 2"
};

const surfaceElements = {
    surface1: { bg: document.getElementById("bg1"), info: document.getElementById("info1"), box: document.getElementById("surface1") },
    surface2: { bg: document.getElementById("bg2"), info: document.getElementById("info2"), box: document.getElementById("surface2") }
};

const colorGrid = document.getElementById("colorGrid");
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
    activeSurfaceName.textContent = surfaceNames[surfaceId] || "Pinta 1";

    Object.values(surfaceElements).forEach(el => {
        if (el.box) el.box.classList.toggle("active-target", el === surfaceElements[surfaceId]);
    });
};

setActiveSurface("surface1");

function applyColorToActiveSurface(colorObj) {
    const state = surfaceStates[activeSurfaceId];
    if (!state) return;
    state.color = colorObj.hex;
    state.name = `${colorObj.name} (${colorObj.hex})`;

    const el = surfaceElements[activeSurfaceId] || {};

    if (el.bg) {
        el.bg.style.backgroundColor = colorObj.hex;
    }
    if (el.info) {
        el.info.textContent = `${colorObj.name} (${colorObj.hex})`;
    }
}

if (resetColorsBtn) {
    resetColorsBtn.addEventListener("click", () => {
        Object.keys(surfaceStates).forEach(id => {
            surfaceStates[id] = { color: null, name: "Ei valittua väriä" };
            const el = surfaceElements[id] || {};
            if (el.bg) el.bg.style.backgroundColor = "transparent";
            if (el.info) el.info.textContent = "Ei valittua väriä";
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".main-nav .nav-link");

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

                    navLinks.forEach(l => l.classList.remove("active"));
                    this.classList.add("active");
                }
            }
        });
    });

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

        submitBtn.disabled = true;
        btnText.hidden = true;
        btnLoading.hidden = false;

        const data = {
            name: fields.name.el.value.trim(),
            email: fields.email.el.value.trim(),
            phone: fields.phone.el.value.trim(),
            message: fields.message.el.value.trim()
        };

        console.log("Lomake lähetetty:", data);

        await new Promise(r => setTimeout(r, 1500));

        btnText.hidden = false;
        btnLoading.hidden = true;
        submitBtn.disabled = false;
        form.reset();
        showStatus("success", "Kiitos viestistäsi! Olemme sinuun yhteydessä pian.");
    });
});
