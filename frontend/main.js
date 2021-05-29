const validator = require('validator');

const formContact = document.querySelector('.form-contact');

if (formContact) {
  formContact.addEventListener('submit', e => {
    e.preventDefault();
    const el = e.target;

    const errors = [];
    const divErrors = document.querySelector('.error-messages');

    const firstName = formContact.querySelector('#first-name').value;
    const email = formContact.querySelector('#email').value;
    const telefone = formContact.querySelector('#telefone').value;

    if (firstName.length == 0) errors.push('Escolha um nome para o seu contato!');

    if (email.length > 0 && !validator.isEmail(email)) {
      errors.push('E-mail inválido.');
    }

    if (email.length == 0 && telefone.length == 0) {
      errors.push('Pelo menos o E-mail ou o Telefone devem ser enviados.');
    }

    if (errors.length > 0) {
      divErrors.style.display = "block";

      for (let erro of errors) {
        divErrors.innerHTML += `${erro}<br>`;
      }
    } else {
      console.log('ENVIEIIIII')
      el.submit();
    }
  });
}
