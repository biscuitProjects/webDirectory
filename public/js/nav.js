// Перейти на главную
const goToMainBtn = document.querySelector('#goToMain');

goToMainBtn.addEventListener('click', (e) =>{
    e.preventDefault()

    window.location.pathname = window.location.pathname
});


// Перейти в админку
const goToAdminPanelBtn = document.querySelector('#goToAdminPanel');

goToAdminPanelBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.pathname = '/regNewWorker'
});

console.log('dadsada')

// Выйти из аккаунта

const logOut = document.querySelector('#logOut')
logOut.addEventListener('click', (e) =>{
    e.preventDefault()

    getUserToken(true)
})