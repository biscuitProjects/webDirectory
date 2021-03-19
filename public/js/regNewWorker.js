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
  