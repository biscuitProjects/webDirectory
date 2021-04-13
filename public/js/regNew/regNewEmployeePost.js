// Создаёт опции в селекте для employee posts
function createElementForSelectEmployee(data){
     clearOptionInEmployeeSelect()
     for (let index = 0; index < data.length; index++) {
          const opt = document.createElement('option')
          opt.classList.add('optionsForEmployee')
          opt.value = data[index].name_deps
          opt.textContent = data[index].name_deps
          optionsEmployee[optionsEmployee.length] = (opt)
     } 
}

const optionsEmployee = document.querySelector('#selectForDeps').options

function clearOptionInEmployeeSelect() {
     for (let index = 0; index < optionsEmployee.length; index++) {
          const element = optionsSubd[index];
          element.remove()
     }
}

const userTokenRNE = getUserToken()

fetchPostData('/admin/getDeps', userTokenRNE).then((data)=>{
     const dataRes = data.message
     console.log('-------------')
     console.log(dataRes)
     console.log('=-------------------------')
     createElementForSelectEmployee(dataRes)
})


const form = document.getElementById('formNewEmployeePost');

function getDataFromForm() {
     const name = document.querySelector('#nameEmployeeInput').value
     const dep = document.querySelector('#selectForDeps').value
     const data = {
          "name": name,
          "dep": dep
     }
     const resData = sendDataNewEployee(data).then((data) =>{
          const message = data.message
          if(message == 'Новая должность создана'){
               console.error('eys')
          }
     })
}

form.addEventListener('submit', (e) =>{
     e.preventDefault()
     getDataFromForm()
})


form.addEventListener("keydown", ({key}) => {
     if (key === "Enter"){
          form.submit()
     }
})


async function sendDataNewEployee(data){
     const response = await fetch("regNewEmployee", {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache', 
          credentials: 'same-origin',
          headers: {
               'Content-Type': 'application/json;charset=utf-8',
               'Authorization': `Bearer ${userTokenRNE.token}`
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data) 
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
