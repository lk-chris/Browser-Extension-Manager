/**
 * Browser Extensions Manager Application Logic
 */
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

// DISPLAY CARDS

function renderCards(extensions){
    gridContainer.innerHTML = "";

    extensions.forEach(item => {
        const cardHTML = `
            <div class="extension-card">
                <div class="extension-card-top">
                    <img src="${item.logo}" alt="${item.name} logo">
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

// REMOVE EXTENSION
gridContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('extension-btn')) {
        const cardName = e.target.dataset.name;
        allExtensions = allExtensions.filter(item => item.name !== cardName);

        const card = e.target.closest('.extension-card');
        if (card) {
            card.remove();
        }
    }
});


// LIGHT MODE & DARK MODE
const themeBox = document.querySelector('.header-mode-toggle');
const modeToggleIcon = document.querySelector('.header-mode-toggle img'); // Target the img inside the box
const body = document.body; 

let themeStatus = 'dark';

themeBox.addEventListener('click', () => {
    if (themeStatus === 'dark') {
        // Switch to Light Mode
        body.classList.add('light-mode');
        modeToggleIcon.src = 'assets/images/icon-moon.svg';
        themeStatus = 'light';
    } else {
        // Switch back to Dark Mode
        body.classList.remove('light-mode');
        modeToggleIcon.src = 'assets/images/icon-sun.svg'; 
        themeStatus = 'dark';
    }
});

// CALLS

loadExtension();
