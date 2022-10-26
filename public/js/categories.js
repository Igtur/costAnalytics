"use strict";

let categories = [];

function getAllCategories() {
    fetch('http://localhost:3005/categoriesData')
        .then(data => data.json())
        .then(data => {
            // console.log(data);

            // categories.splice(0, null, ...data.categories) - баг с отрисовкой при массиве конст

            categories = data.categories;

            drawCategories();
        })
};
getAllCategories();


// Отрисовка контейнера категорий
const categoriesWraper = document.querySelector('.categoriesWraper');

function drawCategories() {

    for (let i = 0; i < categories.length; i++) {

        const category = document.createElement('div');
        category.classList.add('category', 'category' + i, 'rounded', 'border', 'col', 'm-2');
        category.categoryId = categories[i]._id;

        category.innerHTML = categories[i].nameCategory;
        categoriesWraper.append(category);
        const categoryStyle = document.querySelector('.category' + i);
        categoryStyle.style.backgroundColor = categories[i].colorCategory;
        categoryStyle.style.cursor = 'pointer';

    };
};


// Создание категорий с заненсением в БД
document.forms['createCategory'].addEventListener('submit', (event) => {
    event.preventDefault();

    const dataFromcreateCategoryForm = new FormData(document.forms.createCategory);

    fetch('http://localhost:3005/createNewCategory', { method: "post", body: dataFromcreateCategoryForm })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            event.target.reset();
            categoriesWraper.innerHTML = '';
            getAllCategories();
        })
});

let categoryId;

// вызов модального окна редактирования категории, редактирование категории
document.querySelector('.categoriesWraper').addEventListener('click', event => {

    categoryId = event.target.categoryId;

    if (!categoryId) return;

    let currentCategoryName = categories.find(item => item._id === categoryId).nameCategory;
    document.querySelector('#updateCategory').value = currentCategoryName;

    let currentCategoryColor = categories.find(item => item._id === categoryId).colorCategory;

    document.querySelector('#updateColorCategory').value = currentCategoryColor;

    let currentCategoryStatusOnMain = categories.find(item => item._id === categoryId).enabledOnMain;

    if (currentCategoryStatusOnMain === true) {
        document.querySelector('#updateEnabledOnMain').checked = true;
    } else {
        document.querySelector('#updateEnabledOnMain').checked = false;
    }

    new bootstrap.Modal(document.getElementById('updateCategoryModal')).show();

});


document.forms['updateCategory'].addEventListener('submit', event => {
    event.preventDefault();
    const updateCategoryForm = new FormData(document.forms.updateCategory);
    event.stopPropagation();
    // console.log(updateCategoryForm)

    fetch('http://localhost:3005/updateCategory/' + categoryId, { method: "put", body: updateCategoryForm })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            categoriesWraper.innerHTML = '';
            getAllCategories();
        })
    event.target.reset();

});


document.querySelector("[id='#deleteCategory']").addEventListener('click', event => {

    fetch('http://localhost:3005/deleteCategory/' + categoryId, { method: "delete" })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            categoriesWraper.innerHTML = '';
            getAllCategories();
        })
});
