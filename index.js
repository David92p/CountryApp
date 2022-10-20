let country = document.getElementById('search');
let btn = document.getElementById('btn');
let main = document.getElementById('main');
let ul = document.querySelector('ul');

let descriptionList = [];

// search for a random country
const getDataRefresh = async () => {
    const casualCountry = await fetch('https://restcountries.com/v3.1/all') 
    const data = casualCountry.json()
    return data
};

getDataRefresh().then(res => {
    const index = Math.floor(Math.random() * 250)
    document.getElementById('img').src = res[index].flags.png
    document.getElementById('name-flag').innerHTML = res[index].name.common

    let capital = document.createElement('li')
    capital.innerHTML = `CAPITAL = <strong> ${res[index].capital[0].toUpperCase() }</strong>`
    descriptionList.push(capital)
    //ul.appendChild(capital)

    let subregion =  document.createElement('li')
    subregion.innerHTML =  `SUBREGION = <strong> ${res[index].subregion.toUpperCase()} </strong>`
    descriptionList.push(subregion)
    //ul.appendChild(subregion)

    let population =  document.createElement('li')
    population.innerHTML =  `POPULATION = <strong>${res[index].population}</strong>`
    descriptionList.push(population)
    //ul.appendChild(population)

    let language =  document.createElement('li')
    let languages = ""
    for(let el of Object.values(res[index].languages)){
        languages += el + " "
    }
    language.innerHTML =  `OFFICIAL LANGUAGES = <strong> ${languages} </strong>`
    descriptionList.push(language)
    //ul.appendChild(language)

    let currencies = document.createElement('li') 
    let currenciesValue = Object.values(res[index].currencies)
    currencies.innerHTML = `CURRENCIES = <strong> ${currenciesValue[0].name} </strong>`
    descriptionList.push(currencies)
    //ul.appendChild(currencies)
    return descriptionList
}).then(list => {
    list.forEach(el => ul.appendChild(el))
});

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};



 
btn.addEventListener('click', () => {
    // search for a specific country
    const getData = async () => { 
        try {
            const url = `https://restcountries.com/v3.1/name/${country.value}?fullText=true`
            const res = await fetch(url)
            if (res.status == 404){
                throw new Error('ENTER A VALID COUNTRY')
            }return res.json()
        }
        catch(e){
            country.value = ""
            document.getElementById('img').src = ""
            document.getElementById('name-flag').innerHTML = ""
            alert(e.message)
            return
        }
    }
    

    getData().then(res => {
        removeAllChildNodes(ul)
        descriptionList = []
        country.value = ""

        document.getElementById('img').src = res[0].flags.png
        document.getElementById('name-flag').innerHTML = res[0].name.common

        let capital = document.createElement('li')
        capital.innerHTML = `CAPITAL = <strong> ${res[0].capital[0].toUpperCase() }</strong>`
        descriptionList.push(capital)
        
        let subregion =  document.createElement('li')
        subregion.innerHTML =  `SUBREGION = <strong> ${res[0].subregion.toUpperCase()} </strong>`
        descriptionList.push(subregion)
    
        let population =  document.createElement('li')
        population.innerHTML =  `POPULATION = <strong>${res[0].population}</strong>`
        descriptionList.push(population)
    
        let language =  document.createElement('li')
        let languages = ""
        for(let el of Object.values(res[0].languages)){
            languages += el + " "
        }
        language.innerHTML =  `OFFICIAL LANGUAGES = <strong> ${languages} </strong>`
        descriptionList.push(language)
    
        let currencies = document.createElement('li') 
        let currenciesValue = Object.values(res[0].currencies)
        currencies.innerHTML = `CURRENCIES = <strong> ${currenciesValue[0].name} </strong>`
        descriptionList.push(currencies)
        
        return descriptionList
    }).then(list => {
        list.forEach(el => ul.appendChild(el))
    })
});
            
