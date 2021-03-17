let index = 0
// Основной функционал dropDowns
function addDropdows(){
  console.log('wroesad')
  const dropdown = document.querySelectorAll(".dropdown-btn");
  for (const btn of dropdown) {
    if(!index){
      btn.addEventListener("click", (e) =>{
        btn.classList.toggle("activeDDC");
        console.log(btn.textContent)
        let dropdownContent = btn.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          // Тут я ищу и закрываю уже открытые дропдауны
          const otherDropDown = document.querySelectorAll('.dropdown-container')
          for (const iterator of otherDropDown) {
            if(iterator.style.display === "block"){
              iterator.style.display = "none"
              console.log('try')
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
  index = 1
}