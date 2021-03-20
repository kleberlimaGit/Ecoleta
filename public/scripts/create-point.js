    function populateUfs(){
        const ufSelect = document.querySelector("select[name=uf]")
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => {return res.json()})
        .then(states=>{
            const order = states.sort((a,b) => a.nome > b.nome ? 1 : a.nome < b.nome ? -1 : 0 )
            for(const state of order){
                ufSelect.innerHTML +=`<option value = "${state.id}">${state.nome}</option>`
            }
        })
    }
    populateUfs()

    function getCities(event){
        const citySelect = document.querySelector("select[name=city]")
        const stateInput = document.querySelector("input[name=state]")

        citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
        citySelect.disabled = true
        //console.log(event.target.value) // event faz referencia ao change,
         // o target faz referencia ao alvo no caso o select[name=uf]

        const ufValue = event.target.value
        
        const indexOfSelectedState = event.target.selectedIndex
        stateInput.value = event.target.options[indexOfSelectedState].text

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
        
     fetch(url)
     .then(res => {return res.json()})
     .then(cities =>{
        const order = cities.sort((a,b) => a.nome > b.nome ? 1 : a.nome < b.nome ? - 1 : 0)
        for( const city of order){
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
     })   
    }
    

    document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)
 
    //  script dos itens de coleta
    const itensToCollect = document.querySelectorAll(".itens-grid li")

    for(const itens of itensToCollect){
        itens.addEventListener("click",handSelectedItens)
    }

   const collectedItems = document.querySelector("input[name=itens]")
    
   let selectedItens = []

    function handSelectedItens(event){
        const itemLi = event.target
        // toggle adiciona ou remove uma class no javascript
        itemLi.classList.toggle("selected")
        
        const itemId = itemLi.dataset.id
        console.log('Item ID', itemId)

        const alreadySelected = selectedItens.findIndex(item => {
            const itemFound = item == itemId // retorna true ou false
            return itemFound
        })
        if(alreadySelected >= 0){
            const filteredItens = selectedItens.filter(item =>{
                const itemIsDifferent = item != itemId
                return itemIsDifferent

            })
            selectedItens = filteredItens

        }
        else{
            selectedItens.push(itemId)
        }
        console.log('selectedItens: ', selectedItens)

        collectedItems.value = selectedItens
    }

