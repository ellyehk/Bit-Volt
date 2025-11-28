// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const emailFeedback = document.getElementById('emailFeedback');
    const passwordFeedback = document.getElementById('passwordFeedback');
    const successBox = document.getElementById('successBox');
    const showBtn = document.querySelector('.btn-showpass');

    // regex simple para email (suficiente para validar formato)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // mostrar/ocultar contraseña
    showBtn.addEventListener('click', () => {
        const shown = passInput.type === 'text';
        passInput.type = shown ? 'password' : 'text';
        showBtn.innerHTML = shown ? '<i class="bi bi-eye-fill"></i>' : '<i class="bi bi-eye-slash-fill"></i>';
        showBtn.setAttribute('aria-pressed', String(!shown));
    });

    // validación en tiempo real: email
    emailInput.addEventListener('input', () => {
        const val = emailInput.value.trim();
        if (!val) {
            setNeutral(emailInput, emailFeedback, 'Ingresa tu correo electrónico');
        } else if (!emailRegex.test(val)) {
            setInvalid(emailInput, emailFeedback, 'Formato de correo no válido');
        } else {
            setValid(emailInput, emailFeedback, 'Correo válido');
        }
    });

    // validación en tiempo real: contraseña
    passInput.addEventListener('input', () => {
        const val = passInput.value;
        if (!val) {
            setNeutral(passInput, passwordFeedback, 'Ingresa tu contraseña');
        } else if (val.length < 8) {
            setInvalid(passInput, passwordFeedback, 'La contraseña debe tener al menos 8 caracteres');
        } else {
            setValid(passInput, passwordFeedback, 'Contraseña válida');
        }
    });

    // submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailVal = emailInput.value.trim();
        const passVal = passInput.value;

        let ok = true;

        if (!emailVal || !emailRegex.test(emailVal)) {
            setInvalid(emailInput, emailFeedback, 'Ingresa un correo válido');
            ok = false;
        }

        if (!passVal || passVal.length < 8) {
            setInvalid(passInput, passwordFeedback, 'La contraseña debe tener al menos 8 caracteres');
            ok = false;
        }

        if (!ok) {
            // animación de sacudida (pequeña)
            submitBtn.classList.remove('animate-shake');
            void submitBtn.offsetWidth;
            submitBtn.classList.add('animate-shake');
            return;
        }

        // desactivar botón y mostrar loading
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Accediendo...';

        // Simulamos llamada al servidor
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // mostrar mensaje de éxito
            successBox.classList.remove('d-none');
            successBox.focus();

            // limpiar feedbacks
            clearFeedback(emailInput, emailFeedback);
            clearFeedback(passInput, passwordFeedback);

            // aquí podrías redirigir a la dashboard:
            // window.location.href = '/dashboard.html';
        }, 1100);
    });

    // helpers
    function setInvalid(input, feedbackEl, message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        feedbackEl.textContent = message;
        feedbackEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#D83865';
    }

    function setValid(input, feedbackEl, message) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        feedbackEl.textContent = message;
        feedbackEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#214390';
    }

    function setNeutral(input, feedbackEl, message) {
        input.classList.remove('is-invalid', 'is-valid');
        feedbackEl.textContent = message;
        feedbackEl.style.color = '#6c757d';
    }

    function clearFeedback(input, feedbackEl) {
        input.classList.remove('is-invalid', 'is-valid');
        feedbackEl.textContent = '';
    }
});
