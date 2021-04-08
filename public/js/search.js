
// поиск 

const inputSearch = document.querySelector('#input-search-worker')

function APISearchWorker(fullName) {
     const fn = {
          "fn" : fullName
     }
     fetchPostData('/searchWorkersLimit', token, fn).then((data)=>{
          const abc = data.message
          createElemsForWorkersInModal(abc)
     })
}

inputSearch.addEventListener('change', (e) =>{
     e.preventDefault()
     APISearchWorker(document.querySelector('#input-search-worker').value)
})


function createElemsForWorkersInModal(params) {
     const place = document.querySelector('.footerContent')
     place.innerHTML = ''
     for (let index = 0; index < params.length; index++) {
          const div = document.createElement('div')
          div.classList.add('main-info-profile')
          div.innerHTML = `
          <div class="d-flex search-worker">
               <div class="main-info-profile">
               <p class="p-main-info-profile ">${params[index].dep_worker}, ${params[index].subd_worker}</p>
               <p class="p-main-info-profile ">${params[index].employee_worker}</p>
               <p class="p-main-info-profile ">${params[index].fullName_worker}, ${params[index].tel_worker}</p>
               </div>
          </div>

          `
          place.append(div)
     }
}


// <div class="d-flex search-worker">
     // <div class="main-info-profile" style="margin-left: 0px;padding: 10px;">
     //     <p class="p-main-info-profile black-p" style="">Должность&nbsp; Департамент, Подразделение</p>
     //     <p class="p-main-info-profile black-p" style="margin-bottom: 0;font-size: 1.4rem;font-family: Oswald, sans-serif;">Владимир Ким&nbsp; &nbsp; &nbsp;87477477444</p>
     // </div>
// </div>