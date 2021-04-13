// Создаёт опции в селекте для департаментов
function createElementForSelectDirector(id, data){
  for (let index = 0; index < data.length; index++) {
    console.log(data[index].name_deps)
    console.log(id)
    if(data[index].name_deps !== 'global'){
      const opt = document.createElement('option')
      opt.classList.add('optionsForDep')
      opt.value = data[index].name_deps
      opt.textContent = data[index].name_deps
      id[id.length] = (opt)
    }
  } 
}


// Добавление опций в выбор департамента

const optionsDirector =  document.querySelector('#selectForDirector').options
const thisDepSelect = document.querySelector('#selectForDirector')

// thisDepSelect.addEventListener('change', (e) =>{
//   const value = optionsDirector[thisDepSelect.selectedIndex].value
// })

getDeps('/admin/getDirectors', token).then((data)=>{
  const dataRes = data.message
  createElementForSelectDirector(optionsDirector, dataRes)
})


const form = document.getElementById('formLogin');
  form.addEventListener("keydown", ({key}) => {
    if (key === "Enter"){
      form.submit()
    } // Handle press
})
