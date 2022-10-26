"use strict";


let categories = [];

function getAllCategories() {
    fetch('http://localhost:3005/categoriesData')
        .then(data => data.json())
        .then(data => {
            // console.log(data);
            
            // categories.splice(0, null, ...data.categories) - баг с отрисовкой при массиве конст
            
            categories = data.categories;
            drawCategories()

        });
};

getAllCategories();


const containerWithSelected = document.querySelector('.containerWithSelected');

function drawCategories() {

    for (let i = 0; i < categories.length; i++) {

        if(categories[i].enabledOnMain === true) {

        const category = document.createElement('div');
        category.classList.add('category', 'category' + i, 'rounded', 'border', 'col', 'm-2');
        category.categoryId = categories[i]._id;
        
        category.innerHTML = categories[i].nameCategory;
        containerWithSelected.append(category);
        const categoryStyle = document.querySelector('.category' + i);
        categoryStyle.style.backgroundColor = categories[i].colorCategory;
        categoryStyle.style.cursor = 'pointer';
    }
};
const buttoMoreCategories = document.createElement('button');
buttoMoreCategories.classList.add('buttoMoreCategories', );
};
