//-----------------------------------------------------------------

const container_divider = document.getElementById('container-divider')

const input_login_user = document.getElementById('input-login-user')
const input_login_password = document.getElementById('input-login-password')

const button_login_register = document.getElementById('button-login-register')
const button_login_to_enter = document.getElementById('button-login-to-enter')

const mensage_login = document.querySelectorAll('.mensage-login')
const mensage_register = document.querySelectorAll('.mensage-register')

button_login_register.addEventListener('click', enterSystems)
button_login_to_enter.addEventListener('click', signUp)


//-----------------------------------------------------------------

const password_img_01 = document.getElementById('password-img-01')
const password_img_02 = document.getElementById('password-img-02')

password_img_01.addEventListener('click', loginInputPasswordVisible)
password_img_02.addEventListener('click', loginInputPasswordHidden)

function loginInputPasswordVisible() {
  password_img_01.classList.add('visible')
  password_img_02.classList.remove('visible')

  input_login_password.setAttribute('type', 'password')
}

function loginInputPasswordHidden() {
  password_img_01.classList.remove('visible')
  password_img_02.classList.add('visible')

  input_login_password.setAttribute('type', 'text')
}

//-----------------------------------------------------------------

let user_login = ""
let user_password = ""

//-----------------------------------------------------------------

function enterSystems() {

  if(input_login_user.value === "" || input_login_password.value === ""){

    mensage_login.forEach(function(elemento) {
      elemento.textContent = "prencha os campos vazios"
      elemento.classList.remove('valid')
      elemento.classList.add('invalid')
    })

    input_login_user.classList.add('invalid')
    input_login_user.classList.remove('valid')

    input_login_password.classList.add('invalid')
    input_login_password.classList.remove('valid')

  } else if(input_login_user.value === user_login && input_login_password.value === user_password ) {

    mensage_login.forEach(function(elemento) {
      elemento.textContent = "usuário valido"
      elemento.classList.add('valid')
      elemento.classList.remove('invalid')
    })

    input_login_user.classList.remove('invalid')
    input_login_user.classList.add('valid')

    input_login_password.classList.remove('invalid')
    input_login_password.classList.add('valid')

    window.location.href = "service.html";

  } else {

    mensage_login.forEach(function(elemento) {
      elemento.textContent = "usuário não encontrado"
      elemento.classList.remove('valid')
      elemento.classList.add('invalid')
    })

    input_login_user.classList.add('invalid')
    input_login_user.classList.remove('valid')

    input_login_password.classList.add('invalid')
    input_login_password.classList.remove('valid')

  }

}

function signUp() {

  input_login_user.value = ""
  input_login_password.value = ""

  input_login_user.classList.remove('invalid')
  input_login_user.classList.remove('valid')

  input_login_password.classList.remove('invalid')
  input_login_password.classList.remove('valid')

  mensage_login.forEach(function(elemento) {
    elemento.textContent = ""
    elemento.classList.remove('valid')
    elemento.classList.remove('invalid')
  })

  container_divider.classList.toggle('active')
}

// FORMULÁRIO DE LOGIN PARA O LOGIN

const input_register_name       = document.getElementById('input-register-name')
const input_register_cpf        = document.getElementById('input-register-cpf')
const input_register_login      = document.getElementById('input-register-login')
const input_register_password   = document.getElementById('input-register-password')

const mensage_register_name     = document.getElementById('mensage-register-name')
const mensage_register_cpf      = document.getElementById('mensage-register-cpf')
const mensage_register_login    = document.getElementById('mensage-register-login')
const mensage_register_password = document.getElementById('mensage-register-password')

const all_mensage_register      = document.querySelectorAll('.mensage-register')

const footer_description_register = document.getElementById('footer-description-register')

const button_register_register  = document.getElementById('button-register-register')
const button_register_login     = document.getElementById('button-register-login')

const password_img_03  = document.getElementById('password-img-03')
const password_img_04  = document.getElementById('password-img-04')

password_img_03.addEventListener('click', registerInputPasswordVisible)
password_img_04.addEventListener('click', registerInputPasswordHidden)

//-----------------------------------------------------------------

function registerInputPasswordVisible() {
  password_img_03.classList.add('visible')
  password_img_04.classList.remove('visible')

  input_register_password.setAttribute('type', 'password')
}

function registerInputPasswordHidden() {
  password_img_03.classList.remove('visible')
  password_img_04.classList.add('visible')

  input_register_password.setAttribute('type', 'text')
}

//-----------------------------------------------------------------

button_register_register.addEventListener('click', performUserRegistration)

function performUserRegistration() {

    let nameIsVerified       = false;
    let cpfIsVerified        = false;
    let loginIsVerified      = false;
    let passwordIsVerified   = false;

    let value_login;
    let value_password;

    //-----------------------------------------------------------------

    fieldValidationName()
    fieldValidationCpf()
    fieldValidationLogin()
    fieldValidationPassword()

    if (nameIsVerified && cpfIsVerified && loginIsVerified && passwordIsVerified ){

      footer_description_register.innerText = "usuário cadastrado"
      footer_description_register.classList.remove('invalid')
      footer_description_register.classList.add('valid')

      return user_login = value_login, user_password = value_password

    } else {

      footer_description_register.innerText = "preencha os campos corretamente"
      footer_description_register.classList.remove('valid')
      footer_description_register.classList.add('invalid')

    }

    //-----------------------------------------------------------------

    function fieldValidationName() {

      if(input_register_name.value === "") {
    
        mensage_register_name.classList.remove('valid')
        mensage_register_name.classList.add('invalid')
    
        input_register_name.classList.remove('valid')
        input_register_name.classList.add('invalid')
    
        mensage_register_name.innerText = "prencha o campo vázio"
    
      } else if (input_register_name.value.length <= 3) {
    
        mensage_register_name.classList.remove('valid')
        mensage_register_name.classList.add('invalid')
    
        input_register_name.classList.remove('valid')
        input_register_name.classList.add('invalid')
    
        mensage_register_name.innerText = "nome deve ter no minímo 3 caracteries"
    
      } else {
    
        mensage_register_name.classList.add('valid')
        mensage_register_name.classList.remove('invalid')
    
        input_register_name.classList.add('valid')
        input_register_name.classList.remove('invalid')
    
        mensage_register_name.innerText = "nome de usuário válido"
    
        return nameIsVerified = true
      }
    
    }
    
    function fieldValidationCpf() {
    
      if(input_register_cpf.value === "") {
    
        mensage_register_cpf.classList.remove('valid')
        mensage_register_cpf.classList.add('invalid')
    
        input_register_cpf.classList.remove('valid')
        input_register_cpf.classList.add('invalid')
    
        mensage_register_cpf.innerText = "prencha o campo vázio"
    
      } else if ( input_register_cpf.value.length < 11 || input_register_cpf.value.length > 11 ) {
    
        mensage_register_cpf.classList.remove('valid')
        mensage_register_cpf.classList.add('invalid')
    
        input_register_cpf.classList.remove('valid')
        input_register_cpf.classList.add('invalid')
    
        mensage_register_cpf.innerText = "CPF deve ter 12 caracteries"
    
      } else {
    
        mensage_register_cpf.classList.add('valid')
        mensage_register_cpf.classList.remove('invalid')
    
        input_register_cpf.classList.add('valid')
        input_register_cpf.classList.remove('invalid')
    
        mensage_register_cpf.innerText = "CPF válido"
    
        return cpfIsVerified = true
    
      } 
    
    }
    
    function fieldValidationLogin() {
    
      if(input_register_login.value === "") {
    
        mensage_register_login.classList.remove('valid')
        mensage_register_login.classList.add('invalid')
    
        input_register_login.classList.remove('valid')
        input_register_login.classList.add('invalid')
    
        mensage_register_login.innerText = "prencha o campo vázio"
    
      } else if (input_register_login.value.length <= 3) {
    
        mensage_register_login.classList.remove('valid')
        mensage_register_login.classList.add('invalid')
    
        input_register_login.classList.remove('valid')
        input_register_login.classList.add('invalid')
    
        mensage_register_login.innerText = "login deve ter no mininomo 3 caracteres"
    
      } else {
    
        mensage_register_login.classList.add('valid')
        mensage_register_login.classList.remove('invalid')
    
        input_register_login.classList.add('valid')
        input_register_login.classList.remove('invalid')
    
        mensage_register_login.innerText = "login válido"
    
        return value_login = input_register_login.value, loginIsVerified = true
    
      }
    
    }
    
    function fieldValidationPassword() {
    
      if(input_register_password.value === "") {
    
        mensage_register_password.classList.remove('valid')
        mensage_register_password.classList.add('invalid')
    
        input_register_password.classList.remove('valid')
        input_register_password.classList.add('invalid')
    
        mensage_register_password.innerText = "prencha o campo vázio"
    
      } else if ( input_register_password.value.length < 8) {
    
        mensage_register_password.classList.remove('valid')
        mensage_register_password.classList.add('invalid')
    
        input_register_password.classList.remove('valid')
        input_register_password.classList.add('invalid')
    
        mensage_register_password.innerText = "senha deve ter no minimo 8 caracteries"
    
      } else {
    
        mensage_register_password.classList.add('valid')
        mensage_register_password.classList.remove('invalid')
    
        input_register_password.classList.add('valid')
        input_register_password.classList.remove('invalid')
    
        mensage_register_password.innerText = "senha válida"
    
        return value_password = input_register_password.value, passwordIsVerified = true
      } 
    
    }

}

//-----------------------------------------------------------------

button_register_login.addEventListener('click', returnToLogin)

function returnToLogin () {

  //-----------------------------------------------------------------

  input_register_name.value = ""
  input_register_cpf.value = ""
  input_register_login.value = ""
  input_register_password.value = ""
  
  //-----------------------------------------------------------------

  input_register_name.classList.remove('invalid')
  input_register_name.classList.remove('valid')

  input_register_cpf.classList.remove('invalid')
  input_register_cpf.classList.remove('valid')

  input_register_login.classList.remove('invalid')
  input_register_login.classList.remove('valid')

  input_register_password.classList.remove('invalid')
  input_register_password.classList.remove('valid')

  //-----------------------------------------------------------------

  all_mensage_register.forEach(function(elemento) {
    elemento.textContent = ""
    elemento.classList.remove('valid')
    elemento.classList.remove('invalid')
  })

  container_divider.classList.toggle('active')
}