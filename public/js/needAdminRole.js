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

function getUserTokenInNAR(del = false){
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

 const tokenUser =  getUserTokenInNAR()
const objTokenUser = {
    "token": tokenUser
}

if(tokenUser){
     postToken('/auth/checkUserRole', objTokenUser.token).then((data)=>{
         if(data.message == 'Ошибка при проверки токена, перезайдите в аккаунт'){
           getUserTokenInNAR(true)
         }

         if(data.message == 'admin'){
             return 1
         } else{
             window.location.pathname = '/'
         }
     })
 }
 