

const searchWorker = document.querySelector('#searchWorker')

searchWorker.addEventListener('change', (e) =>{

    console.log(1)
    e.preventDefault()
    const text = searchWorker.value
    const fn = {
        fn: text
    }
    fetchPostData('/searchWorkersLimit', token, fn).then((data)=>{
        const abc = data.message
        createElemsForSearchWorker(abc)
    })
})


function createElemsForSearchWorker(params) {
    const place = document.querySelector('.contentSearch')
    place.innerHTML = ''

    for (let i = 0; i < params.length; i++){
        const div = document.createElement('div')
    div.classList.add('workerCardSearch')
//   <p class="phone__num">${params[i].tel_worker}</p>  
    div.innerHTML = `
        <div class="upperContentCard">
            <div class="mainInfoDAM">
                <p class="textDescFN">ФИО: ${params[i].fullName_worker}</p>
            </div>
        </div>
        <div class="lowerContentCard">
            <div class="infoDAM">
                <p class="labelDesc">ДЕПАРТАМЕНТ: ${params[i].dep_worker}</p>
                <p class="textDesc">Подразделение: ${params[i].subd_worker}</p>
            </div>
            <div class="phoneDAM">
                <p class="phone__labelDAM">Телефон</p>
                <p class="phone__num">${params[i].tel_worker}</p>
            </div> 
        </div>
    `
    place.append(div)
    }
    
}