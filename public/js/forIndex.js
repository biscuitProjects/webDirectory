// Нужно для очищение блоков
const primaryContent = document.querySelector(".primary-content")
const defaultContent = document.querySelector('.default-content')


    // Получение данных с LocalStorage
    function getUserToken(del = false){
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            try {
                let jsonUserToken = JSON.parse(localStorage.getItem(key))
                if(jsonUserToken.token.length != 0){
                    if(del == true){
                        localStorage.removeItem(key)
                        window.location.pathname ='/auth/login'
                    }
                    return jsonUserToken;
                }
            } catch (error) {
                console.log(error);
            }
        }
        return 0;
    }


    
// Отправка запроса в бд для получения департаментов

// Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
// getDeps('/getDeps').then((data)=>{
//     const abc = data.message
//     createElemsForDeps(abc)
// })

// функция вывода информации по подразделеним
function  createElemsForDeps(params) {
    for (let i = 0; i < params.length; i++){
        if(params[i].name_deps !== 'global'){
            const div = document.createElement("div")
            div.classList.add('acc-card')
            div.setAttribute('role', 'tablist')
            div.setAttribute('id', `${params[i].name_deps}-acc`)
            div.innerHTML = `
               <div class="card">
                    <div class="card-header item-h1-div" role="tab">
                         <h5 class="d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-start align-items-xxl-center mb-0 deps-item-header h-100">
                              <img src="/static/img/peka.svg" style="width: 44px;height: 44px;">
                              <a data-bs-toggle="collapse" aria-expanded="true" aria-controls="${params[i].name_deps}-acc .item-1" href="#${params[i].name_deps}-acc .item-1" class="acc-header-text" style="margin-right: 0px;margin-left: 20px;">${params[i].name_deps}</a>
                         </h5>
                    </div>
                    <div class="collapse item-1" role="tabpanel" data-bs-parent="#${params[i].name_deps}-acc">
                         <div class="card-body" id="${params[i].name_deps}-place-subd">
                             
                         </div>
                    </div>
               </div>
            `

            const req = {
                dep: div.textContent.trim(),
                user: getUserToken()
            }
            APIGetSubds(req)
            const my_div = document.querySelector("#sideBar");
            my_div.append(div);
        }
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
        createElemsForSubd(abc, depA)
     })
}

  // функция вывода информации по подразделеним
  function  createElemsForSubd(params, depA) {
    for (let i = 0; i < params.length; i++){
        const p = document.createElement("p")
        p.classList.add('card-text', 'acc-content-text')
        p.textContent = params[i].name_subd


     const place = document.querySelector(`#${depA.dep}-place-subd`)

     p.addEventListener('click', (e) =>{
          primaryContent.innerHTML = ''
          defaultContent.innerHTML = ''
          e.preventDefault()
          const req = {
              subd: params[i].name_subd,
              user: getUserToken()
          }
          APIGetWorkersFromSubd(req)
      })  
     //  // Тут получаем блок который относится к тому же департаменту, что и наше подразделение
     //  const aaa = document.querySelector(`#${params[i].dep_subd}-place-sudb`)
     //  // тут получаем родителя этого блока, затем вставляем
     //  const parentD = aaa.parentElement
      place.append(p)
    }
}






// Получение и вывод сотрудников 
// Отправка запроса в бд для получения сотрудников по подразделению
// Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
function APIGetWorkersFromSubd(subdA) {
    const subd = {
        "subd": subdA.subd
    }
    fetchPostData('/getWorkersFromSubd', token, subd).then((data)=>{
        const abc = data.message
        createElemsForWorkers(abc)
    })
}


function getDirecotrFromDB(dep){

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


function searchDirectorAndManager(name, modeForElem){
    const fn = {
        "fn" : name
    }
    fetchPostData('/searchWorkers', token, fn).then((data)=>{
        const abc = data.message
        createElementsForDirectorAndManager(abc, modeForElem)
    })
}

// mode = director or manager
function createElementsForDirectorAndManager(data, mode){
    let workEmployee
    if(mode === 'Директор департамента'){
        workEmployee = data[0].dep_worker
    } else if(mode === 'Старший специалист'){
        workEmployee = data[0].subd_worker
    }
    const contentPage = document.querySelector(".primary-content")

    const divDirector = document.createElement('div')
    // dam = director and manager 
    divDirector.classList.add('d-flex', 'primary-worker')
    data.forEach(element => {
        divDirector.innerHTML = `

          <div class="d-xxl-flex align-items-xxl-center icon-profile" style="width: 100px;">
               <img style="width: 100%;min-width: 100%;height: 90%;" src="/static/img/male.svg">
          </div>
          <div class="main-info-profile">
               <p class="p-main-info-profile">${mode} ${workEmployee}</p>
               <p class="p-main-info-profile">${element.fullName_worker}&nbsp; &nbsp; &nbsp; &nbsp;${element.tel_worker}</p>
          </div>
    `
    });
    contentPage.append(divDirector)
}

// APISearchWorker('arr')

// функция вывода информации по сотрудникам
function  createElemsForWorkers(params) {
    primaryContent.innerHTML = ''
    defaultContent.innerHTML = ''

    let directorName
    let managerName

    function getDirector(){
        params.forEach(element => {
            if(element.director_worker !== null){
                directorName = element.director_worker
            }
        })
    }
    getDirector()
    function getManager(){
        params.forEach(element => {
            if(element.manager_worker !== null){
                managerName = element.manager_worker
            }
        })
    }
    getManager()
    
    searchDirectorAndManager(directorName, 'Директор департамента')
    searchDirectorAndManager(managerName, 'Старший специалист')


    
    for (let i = 0; i < params.length; i++){
        if(params[i].code_worker !== null){
            continue
        }
        const div = document.createElement("div")
        div.classList.add('d-flex', 'default-worker')
        div.innerHTML = `
                <div class="d-xxl-flex align-items-xxl-center icon-profile">
                    <img style="width: 100%;min-width: 100%;height: 90%;" src="/static/img/male.svg">
               </div>
               <div class="main-info-profile">
                    <p class="p-main-info-profile black-label" style="margin-bottom: 0;font-family: Oswald, sans-serif;font-size: 1.4rem;">${params[i].fullName_worker}</p>
                    <p class="p-main-info-profile black-label" style="margin-bottom: 0;font-size: 1.4rem;font-family: Oswald, sans-serif;">${params[i].employee_worker} &nbsp; &nbsp; ${params[i].tel_worker}</p>
               </div>
        `   
        defaultContent.append(div)
    }
}
// Получаю токен из LocaStorage
const token = getUserToken()
// Тут я проверяю авторизован ли пользователь, если то 
if(!token){
    if(window.location.pathname != 'auth/login'){
        window.location.pathname ='auth/login'
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

