const gridContainer = document.querySelector('.extensions-grid')

let allExtensions = [];

async function loadExtension(){
    try{
        const response = await fetch('./data.json');
        const data = await response.json();
        allExtensions = data;

        renderCards(allExtensions);
    }catch (error){
        console.error("Oops couldn't load the data", error)
    }
}

loadExtension();

// DISPLAY CARDS

function renderCards(extensions){
    gridContainer.innerHTML = "";

    extensions.forEach(item => {
        const cardHTML = `
            <div class="extension-card">
                <div class="extension-card-top">
                    <img src="${item.logo}" alt="">
                    <div class="extension-card-top-p">
                        <h3>${item.name}</h3>
                        <p>${item.description}
                        </p>
                    </div>
                </div>
                <div class="extension-card-bottom">
                <button class="extension-btn" data-name= "${item.name}">Remove</button>

                <label class="toggle-switch">
                    <input type="checkbox" class="toggle-input" ${item.isActive ? 'checked' : ''}>
                    <span class="toggle-slider"></span>
                </label>
                </div>
            </div>
        `;

        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// FILTER LOGIC
const btnActive = document.querySelector('.js-filter-active')
const btnAll = document.querySelector('.js-filter-all');
const btnInactive = document.querySelector('.js-filter-inactive');

// ALL
btnAll.addEventListener('click', () =>{
    btnActive.classList.remove('btn-active')
    btnInactive.classList.remove('btn-active')
    btnAll.classList.add('btn-active')
    renderCards(allExtensions)
})

// ACTIVE
btnActive.addEventListener('click', () => {
    btnActive.classList.add('btn-active')
    btnAll.classList.remove('btn-active')
    btnInactive.classList.remove('btn-active')
    const filtered = allExtensions.filter(item => item.isActive)
    renderCards(filtered)
})

// INACTIVE
btnInactive.addEventListener('click', () => {
    btnActive.classList.remove('btn-active')
    btnAll.classList.remove('btn-active')
    btnInactive.classList.add('btn-active')
    const filtered = allExtensions.filter(item => item.isActive === false)
    renderCards(filtered)
})

gridContainer.addEventListener('change', (e) => {
    if(e.target.classList.contains('toggle-input')){
        const cardId = e.target.closest('.extension-card').querySelector('.extension-btn').dataset.name;

        // Find the item in our array and flip its status
        const extension = allExtensions.find(item => item.name == cardId);
        if(extension){
            extension.isActive = e.target.checked;
        }

        console.log("Updated status for:", extension.name, extension.isActive)
    }
})

// CALLS

loadExtension();