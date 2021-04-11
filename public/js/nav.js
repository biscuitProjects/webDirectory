// Перейти на главную
const goToMainBtn = document.querySelector('#goToMain');

goToMainBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.pathname = '/'
});

// Перейти в админку

const tokenUserInNav =  getUserToken()

const checkUserToken = postToken('/auth/checkUserRole', tokenUserInNav).then((data)=>{
    console.log(data)
    if(data.message == 'admin'){
        const adminPanelLi = document.querySelector('#adminPanel-li')
        adminPanelLi.classList.add('show')
        adminPanelLi.classList.remove('hide')
    }
})

const goToAdminPanelBtn = document.querySelector('#goToAdminPanel');

goToAdminPanelBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.pathname = '/regNewWorker'
});

// Перейти на страницу поиска

const goToSearch = document.querySelector('#goToSearch')

goToSearch.addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.pathname = '/searchWorkersLimit'
});

// Перейти на страницу помощи

const goToHelpPage = document.querySelector('#goToHelpPage')

goToHelpPage.addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.pathname = '/helpme'
});


// Выйти из аккаунта

const logOut = document.querySelector('#logOut')
logOut.addEventListener('click', (e) =>{
    e.preventDefault()
    getUserToken(true)
})


