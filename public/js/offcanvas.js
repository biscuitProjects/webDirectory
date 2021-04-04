// функция вывода информации по подразделеним
function  createElemsForDeps(params) {
     for (let i = 0; i < params.length; i++){
          if(params[i].name_deps !== 'global'){
               const div = document.createElement("div")
               div.classList.add('card-header', 'item-h1-div')
               div.setAttribute('role', 'tab')
               div.innerHTML = `
                    <h5 class="d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-start align-items-xxl-center mb-0 deps-item-header h-100">
                         <label  class="toggle btnDep"  id="${params[i].name_deps}" for="main-nav-check" >${params[i].name_deps}</label>
                    </h5>
          `
          const req = {
               dep: params[i].name_deps,
               user: getUserToken()
          }
          APIGetSubds(req)
          const place= document.querySelector(".divContentDeps");
          place.append(div);
          }
     }
}

function  createElemsForSubd(paramsSubd) {

     const place = document.querySelector('.list-subd')
     place.innerHTML = '';
     for (let i = 0; i < paramsSubd.length; i++){
          const ul = document.createElement('ul')
          ul.classList.add('ul-worker')

          ul.innerHTML = `
          
          <li>
               <label for="${paramsSubd[i].name_subd}" id="${paramsSubd[i].name_subd}-li" class="toggle-sub" style="width: 100%; text-align: start; padding: 0 0 0 20px; " onclick="">${paramsSubd[i].name_subd}</label>
               <input type="checkbox" id="${paramsSubd[i].name_subd}" class="sub-nav-check"/>
               <ul id="${paramsSubd[i].name_subd}-sub" class="sub-nav">
                    <li class="sub-heading">${paramsSubd[i].name_subd}
                         <label for="${paramsSubd[i].name_subd}" class="toggle" onclick="" title="Back">&#9658;</label>
                    </li>
               </ul>
          </li> 
          `
          place.append(ul)
          document.querySelector(`#${paramsSubd[i].name_subd}-li`).addEventListener('click', (e)=>{
               const req = paramsSubd[i].name_subd
               APIGetWorkersFromSubd(req)
          })
     }
}


function createElemsForWorkers(paramsWorkers, subd) {
     const place = document.querySelector(`#${subd}-sub`)
     place.innerHTML = `
     
     <li class="sub-heading">${subd}
          <label for="${subd}" class="toggle" onclick="" title="Back">&#9658;</label>
     </li>

     `
     const DAM = findDAM(paramsWorkers)

     for (let index = 0; index < DAM.length; index++) {
          const li = document.createElement('li')
          li.classList.add('li-worker', 'li-worker-DAM')
          li.innerHTML = `
               <div class="info-worker">
                    <p class="name-worker h-50W white-label">${DAM[index].fullName_worker}</p>
                    <p class="position-worker h-50W white-label">${DAM[index].employee_worker}</p>
                </div>
                <div class="phone-worker">
                    <p class="phone__label-worker h-50W white-label">Телефон</p>
                    <p class="phone__num-worker h-50W white-label">${DAM[index].tel_worker}</p>
                </div>
          `
          place.append(li);
     }
          
     for (let index = 0; index < paramsWorkers.length; index++) {
          if(paramsWorkers[index].employee_worker == 'Director' || paramsWorkers[index].employee_worker == 'Manager'){
               continue
          }
          const li = document.createElement('li')
          li.classList.add('li-worker')
          li.innerHTML = `
               <div class="info-worker">
                    <p class="name h-50W white-label">${paramsWorkers[index].fullName_worker}</p>
                    <p class="position h-50W white-label">${paramsWorkers[index].employee_worker}</p>
               </div>
               <div class="phone-worker">
                    <p class="phone__label h-50W white-label">Телефон</p>
                    <p class="phone__num h-50W white-label">${paramsWorkers[index].tel_worker}</p>
               </div>
          `
          place.append(li);
          //<a href="#">${paramsWorkers[index].fullName_worker}</a>
     }
}

// DAM = Director and Manager
function findDAM(params) {
     let  director,
          manager
     for(let i = 0; i < params.length; i++){
          if(params[i].employee_worker == 'Director'){
               director = params[i]
          } else if(params[i].employee_worker == 'Manager'){
               manager = params[i]
          }
     }

     const DAM = [director, manager]
     return DAM
}



function elementsForDAM(params) {
     let workEmployee
     if(mode === 'Директор департамента'){
         workEmployee = data[0].dep_worker
     } else if(mode === 'Старший специалист'){
         workEmployee = data[0].subd_worker
     }

     const divDirector = document.createElement('div')

     divDirector.classList.add('workerCardDAM')
     params.forEach(element => {
         divDirector.innerHTML = `
         <div class="infoDAM">
             <p class="labelDesc white-label">${mode} ${workEmployee} </p>
             <p class="textDesc white-label">${element.fullName_worker}</p>
         </div>
         <div class="phoneDAM">
             <p class="phone__labelDAM white-label">Телефон</p>
             <p class="phone__num white-label">${element.tel_worker}</p>
         </div>     
     `
     })
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
          const subds = data.message
          createElemsForSubd(subds)
     })
}






// Получение и вывод сотрудников 
// Отправка запроса в бд для получения сотрудников по подразделению
// Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
function APIGetWorkersFromSubd(subdA) {
     const subd = {
          "subd": subdA
     }
     fetchPostData('/getWorkersFromSubd', token, subd).then((data)=>{
          const workers = data.message
          createElemsForWorkers(workers, subdA)
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

