// При попадании на сайт проверяется есть ли токен у пользователя


// функция выхода из профиля
// тут я удаляю токен пользователя из Localstorage



// общая фетч функция для пост запросов в бд для получения данных
const fetchPostData = async (url, token, selector) =>{
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


async function getDeps(url, token){
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

// getUserToken(true)


// Сохранение текона в LocalStorage
function saveUserToken(user, token){
    try{
        let userToken = {
            "user": user,
            "token": token
        };
        const jsonUserToken = JSON.stringify(userToken)
        localStorage.setItem("user", jsonUserToken)
        return 1
    } catch(error){
        console.dir(error)
        return 0
    }
   
}

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

function createJsonForUser(username, token){
    try{
        let userToken = {
            "username": username,
            "token": token
        };
        const jsonUserToken = JSON.stringify(userToken)
        return jsonUserToken
    } catch(error){
        console.dir(error)
        return 0
    }
}
function hasToken(token){
    if(token.token){
        const user = {
            "token": token
        }
        postToken('/auth/users', user.token).then((data)=>{
            return data
        })
    } else {
        console.log(`F.hastoken error  token = ${token.token}`)
    }
}



