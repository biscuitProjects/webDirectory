
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

const token = getUserToken()
if(!token){
    if(window.location.href != 'http://localhost:5000/auth/login'){
        window.location.href ='http://localhost:5000/auth/login'
    }
    
} else{
    window.location.href = 'http://localhost:5000/'
}

console.log('login')