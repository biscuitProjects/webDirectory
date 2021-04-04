
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
            div.classList.add('dep')
            div.innerHTML = `
                <div class="dep-ico">
                    <img class="iconForDep" src="img/peka.svg">
                </div>
                <div class="noneflex">
                    <a class="dropdown-btn" id="${params[i].name_deps}">${params[i].name_deps}</a>
                </div>
            `

            const req = {
                dep: div.textContent.trim(),
                user: getUserToken()
            }
            APIGetSubds(req)
            const my_div = document.querySelector(".sidenav");
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
                    document.querySelector(".contentDesc").innerHTML = ''
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
    const contentPage = document.querySelector(".contentDesc")

    const divDirector = document.createElement('div')
    // dam = director and manager 
    divDirector.classList.add('workerCardDAM')
    data.forEach(element => {
        divDirector.innerHTML = `
        <div class="icon">
            <img class="icon__svg" src="/img/male.svg" alt="Мужчина">
        </div>
        <div class="infoDAM">
            <p class="labelDesc">${mode} ${workEmployee} </p>
            <p class="textDesc">${element.fullName_worker}</p>
        </div>
        <div class="phoneDAM">
            <p class="phone__labelDAM">Телефон</p>
            <p class="phone__num">${element.tel_worker}</p>
        </div>     
    `
    });


    // <div class="infoDesc">
    //     <p class="labelDesc">Старший специалист подразделения</p>
    //     <p class="textDesc">${manager}</p>
    // </div>
    contentPage.append(divDirector)
}

// APISearchWorker('arr')

// функция вывода информации по сотрудникам
function  createElemsForWorkers(params) {
    const contentPage = document.querySelector(".workers")
    contentPage.innerHTML = ''

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


let index = 0
// Основной функционал dropDowns
function addDropdows(){
  console.log('wroesad')
  const dropdown = document.querySelectorAll(".dropdown-btn");
  for (const btn of dropdown) {
    if(!index){
      btn.addEventListener("click", (e) =>{
        btn.classList.toggle("activeDDC");
        console.log(btn.textContent)
        let dropdownContent = btn.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          // Тут я ищу и закрываю уже открытые дропдауны
          const otherDropDown = document.querySelectorAll('.dropdown-container')
          for (const iterator of otherDropDown) {
            if(iterator.style.display === "block"){
              iterator.style.display = "none"
              console.log('try')
            }
          }
          // Тут я закрываю дропдаун если он открыт и я на него нажал
          dropdownContent.style.display = "block";
        }
      });
    } else{
      break;
    }
    
  }  
  index = 1
}
