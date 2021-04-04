// функция вывода информации по подразделеним
function  createElemsForDeps(params) {
     for (let i = 0; i < params.length; i++){
          if(params[i].name_deps !== 'global'){
               const li = document.createElement("li")
               li.classList.add('nav-item', 'dropdown', 'dropdown-navbar')
               li.setAttribute('id', `${params[i].name_deps}-li`)
               li.innerHTML = `
                    <a class="nav-link dropdown-toggle white-label" href="#" id="${params[i].name_deps}" role="button" 
                         data-bs-toggle="dropdown" aria-expanded="false">${params[i].name_deps}</a>
               `
               const req = {
                    dep: params[i].name_deps,
                    user: getUserToken()
               }
               APIGetSubds(req)
               const place= document.querySelector(".navbar-nav");
               place.append(li);
          }
     }
}
    
function  createElemsForSubd(paramsSubd, dep) {
    
     const place = document.querySelector(`#${dep}-li`)
     const ul = document.createElement('ul')
     ul.classList.add('dropdown-menu')
     ul.setAttribute('aria-labelledby', dep)

     for (let i = 0; i < paramsSubd.length; i++){
          ul.innerHTML += `
               <li><a class="dropdown-item white-label" id="${paramsSubd[i].name_subd}" href="#">${paramsSubd[i].name_subd}</a></li>
          `
          place.append(ul)
          document.querySelector(`#${paramsSubd[i].name_subd}`).addEventListener('click', (e)=>{
               const req = paramsSubd[i].name_subd
               APIGetWorkersFromSubd(req)
               document.querySelector('#navbarResponsive')
                    .classList.remove('show')
          })
     }
}
    
    
function createElemsForWorkers(paramsWorkers, subd) {
     const place = document.querySelector(`main`)
     place.innerHTML = ''
     const DAM = findDAM(paramsWorkers)
    
     for (let index = 0; index < DAM.length; index++) {
          const li = document.createElement('li')
          li.classList.add('li-worker', 'li-worker-DAM')
          li.innerHTML = `
               <div class="workerCard">
                    <div class="info-worker">
                        <p class="name-worker h-50W white-label">${DAM[index].fullName_worker}</p>
                        <p class="position-worker h-50W white-label">${DAM[index].employee_worker}</p>
                    </div>
                    <div class="phone-worker">
                        <p class="phone__label-worker h-50W white-label">Телефон</p>
                        <p class="phone__num-worker h-50W white-label">${DAM[index].tel_worker}</p>
                    </div>
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
               <div class="workerCard basic-worker">
                    <div class="info-worker">
                         <p class="name h-50W white-label">${paramsWorkers[index].fullName_worker}</p>
                         <p class="position h-50W white-label">${paramsWorkers[index].employee_worker}</p>
                    </div>
                    <div class="phone-worker">
                         <p class="phone__label h-50W white-label">Телефон</p>
                         <p class="phone__num h-50W white-label">${paramsWorkers[index].tel_worker}</p>
                    </div>
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
         createElemsForSubd(subds, depA.dep)
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
    
    