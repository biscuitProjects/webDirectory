
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

const token = getUserToken()
if(!token){
    if(window.location.pathname != '/auth/login'){
        window.location.pathname ='/auth/login'
    }
    
} else{
    window.location.pathname = '/'
}



(function() {
    "use strict"; // Start of use strict
  
    document.querySelector(".form-input-pass").onkeydown = function(e){
        if((e.which >=48 && e.which <=57)  // цифры
            || (e.which >=96 && e.which <=105)  // num lock
            || e.which==8 // backspace
            || (e.which >=37 && e.which <=40) // стрелки
          || e.which==46) // delete 
        {
            return true;
        } else {
            return false;            
        }	
    }
    
    function useForm() {
        const password = document.querySelector('.form-input-pass').value
        sendPinCode('login', password).then((data) =>{
            const message = data.message
            if(message == 'Введен неверный пароль'){
                showToast()
            } else{
                saveUserToken(message.user, message.token)
                window.location.pathname = '/'
            }
            console.log(data.message)
        })
    }

    const form = document.getElementById('formLogin');
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        useForm()
    })

    form.addEventListener("keydown", ({key}) => {
      if (key === "Enter"){
        useForm()
      } // Handle press
    })
    
    
    async function sendPinCode(url, pincode){
        const password = {
            password: pincode
        }
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin',
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(password) 
        })
        if (!response.ok) {
            console.log(response.statusText)
            // // Сервер вернул код ответа за границами диапазона [200, 299]
            // return Promise.reject(new Error(
            //     'Response failed: ' + response.status + ' (' + response.statusText + ')'
            // ))
        }
        const body = await response.json()
        return body
    }

    function showToast() {
        const toast = document.querySelector('.toast-error-login')
        toast.classList.remove('hide')
        setTimeout(() => {
            toast.classList.add('hide')
        }, 5000);
    }

})(); // End of use strict