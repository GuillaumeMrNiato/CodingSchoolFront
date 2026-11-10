/* Coding School — Scripts communs (harmonisés Excel Mastery / NEOSmart) */
(function () {
    'use strict';

    /* Fermeture de la bannière « En maintenance » */
    var banner = document.getElementById('maintenance-banner');
    var bannerClose = document.getElementById('banner-close');
    if (banner && bannerClose) {
        bannerClose.addEventListener('click', function () {
            banner.style.display = 'none';
        });
    }

    /* Validation du formulaire de connexion (identifiant = e-mail institutionnel) */
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        var groupEmail = document.getElementById('group-email');
        var groupPassword = document.getElementById('group-password');
        var loginError = document.getElementById('login-error');

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;

            var emailOk = /^[^\s@]+@neoma-bs\.com$/i.test(email.value.trim());
            groupEmail.classList.toggle('invalid', !emailOk);
            if (!emailOk) ok = false;

            var pwdOk = password.value.length > 0;
            groupPassword.classList.toggle('invalid', !pwdOk);
            if (!pwdOk) ok = false;

            if (!ok) {
                loginError.textContent = 'Veuillez corriger les champs surlignés.';
                loginError.classList.add('show');
                return;
            }

            loginError.classList.remove('show');
            window.location.href = 'dashboard.html';
        });

        var forgot = document.getElementById('forgot-password');
        if (forgot) {
            forgot.addEventListener('click', function (e) {
                e.preventDefault();
                loginError.classList.remove('show');
                var info = document.createElement('div');
                info.className = 'alert alert-info show';
                info.setAttribute('role', 'status');
                info.textContent = 'Un e-mail de réinitialisation vous sera envoyé à votre adresse institutionnelle.';
                loginForm.insertBefore(info, loginForm.firstChild.nextSibling);
            });
        }
    }

    /* Dépôt de rendu de projet */
    var depotForm = document.getElementById('depot-form');
    if (depotForm) {
        var success = document.getElementById('depot-success');
        var error = document.getElementById('depot-error');
        depotForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var projet = document.getElementById('projet');
            var fichier = document.getElementById('fichier');
            var ok = true;

            var projetOk = projet.value !== '';
            document.getElementById('group-projet').classList.toggle('invalid', !projetOk);
            if (!projetOk) ok = false;

            var fichierOk = fichier.files && fichier.files.length > 0;
            document.getElementById('group-fichier').classList.toggle('invalid', !fichierOk);
            if (!fichierOk) ok = false;

            if (!ok) {
                error.textContent = 'Veuillez sélectionner un projet et joindre un fichier.';
                error.classList.add('show');
                success.classList.remove('show');
                return;
            }
            error.classList.remove('show');
            success.textContent = 'Rendu déposé avec succès. Un professeur va corriger votre projet.';
            success.classList.add('show');
            depotForm.reset();
        });
    }

    /* Réservation d'atelier NEOSmart — message « Confirmation validée » */
    var reserveButtons = document.querySelectorAll('.reserve-btn');
    var resSuccess = document.getElementById('reservation-success');
    reserveButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var atelier = btn.getAttribute('data-atelier');
            resSuccess.textContent = 'Confirmation validée : votre place pour l’atelier « ' + atelier + ' » est réservée. Un e-mail récapitulatif vous sera envoyé.';
            resSuccess.classList.add('show');
            btn.textContent = 'Réservé ✓';
            btn.disabled = true;
            resSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
})();
