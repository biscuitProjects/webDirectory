// let addedFromPwa = 1

// // При попадании на сайт проверяется есть ли токен у пользователя


// // общая фетч функция для пост запросов в бд для получения данных
// const fetchPostData = async (url, token, selector) =>{
//     console.log(selector)
//     const response = await fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache', 
//         credentials: 'same-origin',
//         redirect: 'follow', 
//         referrerPolicy: 'no-referrer',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(selector) 
//     })
//     if (!response.ok) {
//         console.log(response.statusText)
//         // Сервер вернул код ответа за границами диапазона [200, 299]
//         return Promise.reject(new Error(
//             'Response failed: ' + response.status + ' (' + response.statusText + ')'
//         ))
//     }
//     const body = await response.json()
//     console.log(body)
//     return body
// }


// const postToken = async (url, data) =>{
//     const token = data.token
//     const response = await fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache', 
//         credentials: 'same-origin',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//           'Authorization': `Bearer ${token}`
//         },
//         redirect: 'follow', 
//         referrerPolicy: 'no-referrer',
//     })
//     if (!response.ok) {
//         // Сервер вернул код ответа за границами диапазона [200, 299]
//         return Promise.reject(new Error(
//             'Response failed: ' + response.status + ' (' + response.statusText + ')'
//         ))
//     }
//     const body = await response.json()
//     return body
// }

// // функция выхода из профиля
// // тут я удаляю токен пользователя из Localstorage


// // getUserToken(true)


// // Сохранение текона в LocalStorage
// function saveUserToken(user, token){
//     try{
//         let userToken = {
//             "user": user,
//             "token": token
//         };
//         const jsonUserToken = JSON.stringify(userToken)
//         localStorage.setItem("user", jsonUserToken)
//         return 1
//     } catch(error){
//         console.dir(error)
//         return 0
//     }
   
// }

//     // Получение данных с LocalStorage
// function getUserToken(del = false){
//     for (let i = 0; i < localStorage.length; i++) {
//         let key = localStorage.key(i);
//         try {
//             let jsonUserToken = JSON.parse(localStorage.getItem(key))
//             if(jsonUserToken.token.length != 0){
//                 if(del == true){
//                     localStorage.removeItem(key)
//                     window.location.href ='http://localhost:5000/auth/login'
//                 }
//                 return jsonUserToken;
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return 0;
// }

// function createJsonForUser(username, token){
//     try{
//         let userToken = {
//             "username": username,
//             "token": token
//         };
//         const jsonUserToken = JSON.stringify(userToken)
//         return jsonUserToken
//     } catch(error){
//         console.dir(error)
//         return 0
//     }
// }
// function hasToken(token){
//     if(token.token){
//         const user = {
//             "token": token
//         }
//         postToken('/auth/users', user.token).then((data)=>{
//             return data
//         })
//     } else {
//         console.log(`F.hastoken error  token = ${token.token}`)
//     }
// }





// // Отправка запроса в бд для получения департаментов
// const getDeps = async (url, token) =>{
//     const response = await fetch(url, {
//         method: 'GET',
//         mode: 'cors',
//         cache: 'no-cache', 
//         credentials: 'same-origin',
//         redirect: 'follow', 
//         referrerPolicy: 'no-referrer',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//             'Authorization': `Bearer ${token}`
//         },
//     })
//     if (!response.ok) {
//         console.log(`Response failed: ' ${response.status} + ${response.statusText}`)
//         // Сервер вернул код ответа за границами диапазона [200, 299]
//         return `Response failed: ' ${response.status} + ${response.statusText}`
//     }
//     const body = await response.json()
//     return body
// }
// // Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
// // getDeps('/getDeps').then((data)=>{
// //     const abc = data.message
// //     createElemsForDeps(abc)
// // })

// // функция вывода информации по подразделеним
// function  createElemsForDeps(params) {
//     for (let i = 0; i < params.length; i++){
//         const div = document.createElement("div")
//         div.innerHTML = `<h2>${params[i].name_deps}`
//         div.addEventListener('click', (e) =>{
//             e.preventDefault()
//             const req = {
//                 dep: div.textContent,
//                 user: getUserToken()
//             }
//             APIGetSubds(req)
//         })
//         const my_div = document.getElementById("container");
//         document.body.insertBefore(div, my_div);
//     }

// }





// // Получение и вывод подразделений
// // Отправка запроса в бд для получения подразделений по департаменту
// // АПИ для вызова всех функций, которые нужны для вывода подразделений одного департамента
// function APIGetSubds(depA) {
//     const dep = {
//         "dep": depA.dep
//     }
//     fetchPostData('/getSubdsFromDep', token, dep).then((data)=>{
//         console.log(data.message)
//         const abc = data.message
//         createElemsForSubd(abc)
//     })
// }

//   // функция вывода информации по подразделеним
//   function  createElemsForSubd(params) {
//     for (let i = 0; i < params.length; i++){
//         const div = document.createElement("div")
//         div.innerHTML = `<h2>${params[i].name_subd}`
//         div.addEventListener('click', (e) =>{
//             e.preventDefault()
//             const req = {
//                 subd: div.textContent,
//                 user: getUserToken()
//             }
//             APIGetWorkersFromSubd(req)
//         })
//         const my_div = document.getElementById("container");
//         document.body.insertBefore(div, my_div);
//     }
// }






// // Получение и вывод сотрудников 
// // Отправка запроса в бд для получения сотрудников по подразделению
// // Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
// function APIGetWorkersFromSubd(subdA) {
//     const subd = {
//         "subd": subdA.subd
//     }
//     fetchPostData('/getWorkersFromSubd', token, subd).then((data)=>{
//         console.log(data.message)
//         const abc = data.message
//         createElemsForWorkers(abc)
//     })
// }

// // функция вывода информации по сотрудникам
// function  createElemsForWorkers(params) {
//     for (let i = 0; i < params.length; i++){
//         const div = document.createElement("div")
//         div.innerHTML = `<h2>${params[i].fullName_worker}`
//         const my_div = document.getElementById("container");
//         document.body.insertBefore(div, my_div);
//     }

// }




// // Поиск сотрудников по фио
// // Вызываем и Получаем ответ из запроса  и вызываем функцию вывода 
// const worker = {
//     fullName: "arr"
// }


// function APISearchWorker(fn) {
//     fetchPostData('/searchWorkers', token, fn).then((data)=>{
//         const abc = data.message
//         createElemsForWorkers(abc)
//     })
// }

// // APISearchWorker('arr')

// // функция вывода информации по сотрудникам
// function  createElemsForWorkers(params) {
//     for (let i = 0; i < params.length; i++){
//         const div = document.createElement("div")
//         div.innerHTML = `<h2>${params[i].fullName_worker}`
//         const my_div = document.getElementById("container");
//         document.body.insertBefore(div, my_div);
//     }

// }
// // Получаю токен из LocaStorage
// const token = getUserToken()
// // Тут я проверяю авторизован ли пользователь, если то 
// if(!token){
//     if(window.location.href != 'http://localhost:5000/auth/login'){
//         window.location.href ='http://localhost:5000/auth/login'
//     }
    
// } else{
//     // Тут я могу добавить проверку токена на валидность, которую в будущем можно добавить


//     // Тут я проверяю добавил ли я уже департаменты из скрипта ПВА
//     // Если добавил то не вывожу

//     if(addedFromPwa){
//         console.log('public')
//         // Если пользователь авторизован, то выводим департаменты
//         getDeps('/getDeps', token).then((data)=>{
//             const abc = data.message
//             createElemsForDeps(abc)
//         })
//     }
    
    
// }
