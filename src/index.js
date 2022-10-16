let doggosArray = [];

fetch('http://localhost:3000/pups')
.then(res => res.json())
.then(data => data.forEach(ele => doggosArray.push(ele)))

setTimeout(()=> renderNames() ,1000)

function renderNames(){
    const dogBar = document.querySelector('#dog-bar');
    doggosArray.forEach( element => {
    let doggoSpan = document.createElement('span');
    doggoSpan.innerHTML = element.name;
    doggoSpan.addEventListener('click', () => displayDogInfo(element))
    dogBar.appendChild(doggoSpan)
        }
    )}

    let tempDog = {};
    function displayDogInfo(element){
        tempDog = element;
        const dogInfo = document.querySelector('#dog-info');
        let dogStatus = '';
        element.isGoodDog? dogStatus='Good Boy :)':dogStatus='Bad Dog :('
        dogInfo.innerHTML = `<img src="${element.image}">
                          <h2>${element.name}</h2>
                          <button id="dogBtn"> ${dogStatus} </button> `
        
        document.querySelector('#dogBtn').addEventListener('click', () => toggleStatus())
        
    }

function toggleStatus(){
    tempDog.isGoodDog = !tempDog.isGoodDog;
    let dogStatus = document.querySelector('#dogBtn');
    dogStatus.innerHTML == 'Good Boy :)'? dogStatus.innerHTML = 'Bad Dog :(' : dogStatus.innerHTML = 'Good Boy :)';

    fetch(`http://localhost:3000/pups/${tempDog.id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tempDog)
    })
}
   

