// Основной функционал dropDowns for reg.html
const dropdown = document.querySelectorAll(".usr_dat");
for (const btn of dropdown) {
  if(!index){
    btn.addEventListener("click", (e) =>{
      btn.classList.toggle("activeDDC");
      let dropdownContent = btn.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        // Тут я ищу и закрываю уже открытые дропдауны
        const otherDropDown = document.querySelectorAll('.dropdown-container')
        for (const iterator of otherDropDown) {
          if(iterator.style.display === "block"){
            iterator.style.display = "none"
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


const gotoMainFromReg = document.querySelector('.logo_svg')

gotoMainFromReg.addEventListener('click', (e) =>{
  e.preventDefault()
  window.location.pathname = '/'
})


// Создаёт опции в селекте для департаментов
function createElementForSelectDep(id, data){
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

// Создаёт опции в селекте для subd
function createElementForSelectSubd(id, data){
  for (let index = 0; index < data.length; index++) {
      const opt = document.createElement('option')
      opt.classList.add('optionsForSubd')
      opt.value = data[index].name_subd
      opt.textContent = data[index].name_subd
      id[id.length] = (opt)
  } 
}

// Создаёт опции в селекте для employee posts
function createElementForSelectEmployee(id, data){
  for (let index = 0; index < data.length; index++) {
    if(data[index].name !== 'global'){
      const opt = document.createElement('option')
      opt.classList.add('optionsForEmployee')
      opt.value = data[index].name
      opt.textContent = data[index].name
      id[id.length] = (opt)
    }
  } 
}




// Добавление опций в выбор департамента

const optionsDep =  document.querySelector('#selectForDeps').options
const thisDep = document.querySelector('#selectForDeps')
thisDep.addEventListener('change', (e) =>{
  const value = optionsDep[thisDep.selectedIndex].value
  GetSubdForRegNW(value)
  GetEmployeeForRegNW(value)
  document.querySelector('#selectForSubds').disabled = false
})

getDeps('/getDeps', token).then((data)=>{
  const abc = data.message
  createElementForSelectDep(optionsDep, abc)
})




const optionsSubd = document.querySelector('#selectForSubds').options

const thisSubd = document.querySelector('#selectForSubds')

function GetSubdForRegNW(depA) {
  const dep = {
      "dep": depA
  }
  fetchPostData('/getSubdsFromDep', token, dep).then((data)=>{
      const abc = data.message
      console.log(abc)
      createElementForSelectSubd(optionsSubd, abc)
  })
}


const selectForEmployee = document.querySelector('#selectForEmployee').options


function  GetEmployeeForRegNW(data) {
  console.log(data)
  const dep = {
    "dep": data
  }
  fetchPostData('/getEmployeePosts', token, dep).then((data)=>{
    const abc = data.message
    document.querySelector('#selectForEmployee').disabled = false
    createElementForSelectEmployee(selectForEmployee, abc)
  })
}