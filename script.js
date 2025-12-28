// ================= ELEMENTS =================
const form = document.querySelector("form");
const usernameInput = document.getElementById("username");
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.querySelector(".submit");
const strengthText = document.getElementById("passwordStrength");

const rules = {
    length: document.getElementById("rule-length"),
    case: document.getElementById("rule-case"),
    symbol: document.getElementById("rule-symbol"),
    email: document.getElementById("rule-email"),
};

// ================= HELPERS =================
function setRuleState(rule, state) {
    rule.classList.remove("neutral", "error", "valid");

    if (state === "neutral") rule.classList.add("neutral");
    if (state === "error") rule.classList.add("error");
    if (state === "valid") rule.classList.add("valid");
}

// ================= USERNAME =================
function validateUsername() {
    const value = usernameInput.value.trim();
    const error = usernameInput.nextElementSibling;

    if (value.length < 3 || value.length > 15) {
        error.textContent = "Username must be between 3 and 15 characters";
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
}

// ================= PASSWORD =================
function validatePassword() {
    const password = passwordInput.value;
    const email = emailInput.value.toLowerCase().trim();

    // اگر خالی است → همه طوسی
    if (password.length === 0) {
        Object.values(rules).forEach(rule => setRuleState(rule, "neutral"));
        strengthText.textContent = "Password Strength : weak";
        return false;
    }

    const lengthOK = password.length >= 8;
    const caseOK = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const symbolOK = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    let emailUser = "";
    if (email.includes("@")) emailUser = email.split("@")[0];
    const emailOK =
        emailUser === "" || !password.toLowerCase().includes(emailUser);

    // وضعیت رنگ قوانین
    setRuleState(rules.length, lengthOK ? "valid" : "error");
    setRuleState(rules.case, caseOK ? "valid" : "error");
    setRuleState(rules.symbol, symbolOK ? "valid" : "error");
    setRuleState(rules.email, emailOK ? "valid" : "error");

    const isStrong = lengthOK && caseOK && symbolOK && emailOK;

    strengthText.textContent = isStrong
        ? "Password Strength : strong"
        : "Password Strength : weak";

    return isStrong;
}

// ================= FORM =================
function validateForm() {
    const usernameOK = validateUsername();
    const fullnameOK = fullnameInput.value.trim().length > 0;
    const emailOK = emailInput.checkValidity();
    const passwordOK = validatePassword();

    submitBtn.disabled = !(usernameOK && fullnameOK && emailOK && passwordOK);
}

// ================= EVENTS =================
usernameInput.addEventListener("input", validateForm);
fullnameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("ثبت شد");
});
