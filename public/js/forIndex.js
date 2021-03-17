
    // Получение данных с LocalStorage
    function getUserToken(del = false){
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            try {
                let jsonUserToken = JSON.parse(localStorage.getItem(key))
                if(jsonUserToken.token.length != 0){
                    if(del == true){
                        localStorage.removeItem(key)
                        window.location.href ='http://localhost:5000/auth/login'
                    }
                    return jsonUserToken;
                }
            } catch (error) {
                console.log(error);
            }
        }
        return 0;
    }


    
// общая фетч функция для пост запросов в бд для получения данных
const fetchPostData = async (url, token, selector) =>{
    console.log(selector)
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selector) 
    })
    if (!response.ok) {
        console.log(response.statusText)
        // Сервер вернул код ответа за границами диапазона [200, 299]
        return Promise.reject(new Error(
            'Response failed: ' + response.status + ' (' + response.statusText + ')'
        ))
    }
    const body = await response.json()
    console.log(body)
    return body
}


const postToken = async (url, data) =>{
    const token = data.token
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
    })
    if (!response.ok) {
        // Сервер вернул код ответа за границами диапазона [200, 299]
        return Promise.reject(new Error(
            'Response failed: ' + response.status + ' (' + response.statusText + ')'
        ))
    }
    const body = await response.json()
    return body
}


// Отправка запроса в бд для получения департаментов
const getDeps = async (url, token) =>{
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin',
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        console.log(`Response failed: ' ${response.status} + ${response.statusText}`)
        // Сервер вернул код ответа за границами диапазона [200, 299]
        return `Response failed: ' ${response.status} + ${response.statusText}`
    }
    const body = await response.json()
    return body
}
// Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
// getDeps('/getDeps').then((data)=>{
//     const abc = data.message
//     createElemsForDeps(abc)
// })

// функция вывода информации по подразделеним
function  createElemsForDeps(params) {
    for (let i = 0; i < params.length; i++){
        const div = document.createElement("div")
        div.classList.add('dep')
        div.innerHTML = `
            <div class="dep-ico">
                <img class="iconForDep" src="img/peka.svg">
            </div>
            <div class="noneflex">
                <a class="dropdown-btn" id="${params[i].name_deps}">${params[i].name_deps}</a>
            </div>
        `

        // div.addEventListener('click', (e) =>{
        //     e.preventDefault()
        //     console.log(div.textContent.trim())
        //     const req = {
        //         dep: div.textContent.trim(),
        //         user: getUserToken()
        //     }
        //     APIGetSubds(req)
        // })

        const req = {
                    dep: div.textContent.trim(),
                    user: getUserToken()
                }
        APIGetSubds(req)
        const my_div = document.querySelector(".sidenav");
        my_div.append(div);
    }

}





// Получение и вывод подразделений
// Отправка запроса в бд для получения подразделений по департаменту
// АПИ для вызова всех функций, которые нужны для вывода подразделений одного департамента
function APIGetSubds(depA) {
    const dep = {
        "dep": depA.dep
    }
    fetchPostData('/getSubdsFromDep', token, dep).then((data)=>{
        console.log(data.message)
        const abc = data.message
        createElemsForSubd(abc)
    })
}

  // функция вывода информации по подразделеним
  function  createElemsForSubd(params) {
    for (let i = 0; i < params.length; i++){
        const div = document.createElement("div")
        div.classList.add('dropdown-container')
        // div.style = 'display: none;
        div.innerHTML = `
            <a href="#" class="linksubd">${params[i].name_subd}</a>
        `
        // div.innerHTML = `<h2>${params[i].name_subd}`
        // div.addEventListener('click', (e) =>{
        //     e.preventDefault()
        //     const req = {
        //         subd: div.textContent,
        //         user: getUserToken()
        //     }
        //     APIGetWorkersFromSubd(req)
        // })


        // Тут нужно найти блок ДД, где его textContent = подразделению 
        const my_div = document.querySelectorAll(".dep");
        for (const [index, iterator] of my_div.entries()) {
            // console.log(`iterator = ${iterator.textContent.trim()}   params = ${params[i].dep_subd}`)
            if(iterator.textContent.trim() == `${params[i].dep_subd}`){
                div.addEventListener('click', (e) =>{
                    e.preventDefault()
                    const req = {
                        subd: params[i].name_subd,
                        user: getUserToken()
                    }
                    APIGetWorkersFromSubd(req)
                })  
                // Тут получаем блок который относится к тому же департаменту, что и наше подразделение
                const aaa = document.querySelector(`#${params[i].dep_subd}`)
                // тут получаем родителя этого блока, затем вставляем
                const parentD = aaa.parentElement
                parentD.append(div)
            }
        }
    }
    addDropdows()
}






// Получение и вывод сотрудников 
// Отправка запроса в бд для получения сотрудников по подразделению
// Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
function APIGetWorkersFromSubd(subdA) {
    const subd = {
        "subd": subdA.subd
    }
    fetchPostData('/getWorkersFromSubd', token, subd).then((data)=>{
        console.log(data.message)
        const abc = data.message
        createElemsForWorkers(abc)
    })
}


// Поиск сотрудников по фио
// Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
const worker = {
    fullName: "arr"
}


function APISearchWorker(fn) {
    fetchPostData('/searchWorkers', token, fn).then((data)=>{
        const abc = data.message
        createElemsForWorkers(abc)
    })
}

// APISearchWorker('arr')

// функция вывода информации по сотрудникам
function  createElemsForWorkers(params) {
    const contentPage = document.querySelector(".workers")
    contentPage.innerHTML = ''

    const divDirector = document.createElement('div')
    divDirector.classList.add('contentDesc')
    divDirector.innerHTML = `
        <div class="infoDesc">
            <p class="labelDesc">Директор департамента</p>
            <p class="textDesc">Владимир Ким</p>
        </div>
        <div class="infoDesc">
            <p class="labelDesc">Старший специалист подразделения</p>
            <p class="textDesc">Юрий Тян</p>
        </div>
    `

    for (let i = 0; i < params.length; i++){
        const div = document.createElement("div")
        div.classList.add('workerCard')
        div.innerHTML = `
                <div class="icon">
                    <img class="icon__svg" src="/img/male.svg" alt="Мужчина">
                </div>
                <div class="info">
                    <p class="name">${params[i].fullName_worker}</p>
                    <p class="position">${params[i].employee_worker}</p>
                </div>
                <div class="phone">
                    <p class="phone__label">Телефон</p>
                    <p class="phone__num">${params[i].tel_worker}</p>
                </div>
        `   
        contentPage.append(div)
    }
}
// Получаю токен из LocaStorage
const token = getUserToken()
// Тут я проверяю авторизован ли пользователь, если то 
if(!token){
    if(window.location.href != 'http://localhost:5000/auth/login'){
        window.location.href ='http://localhost:5000/auth/login'
    }
    
} else{
    // Тут я могу добавить проверку токена на валидность, которую в будущем можно добавить


    // Тут я проверяю добавил ли я уже департаменты из скрипта ПВА
    // Если добавил то не вывожу

   
        // Если пользователь авторизован, то выводим департаменты
        getDeps('/getDeps', token).then((data)=>{
            const abc = data.message
            createElemsForDeps(abc)
        })
}