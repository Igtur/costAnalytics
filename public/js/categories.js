"use strict";



let categories = [];


function getAllCategories() {
fetch('http://localhost:3005/categoriesData')
    .then(data => data.json())
    .then(data => {
        // console.log(data);
        categories = data.categories

        drawCategories()
    })
}
getAllCategories()


// метод для расшаривания паг файла
// fetch('http://localhost:3005/cData')
// .then(data=>data.text())
// .then(data=>{
//     // console.log(data);
//     // categories= data.categories
//     document.querySelector('.wraperPage').innerHTML=data
// })


// Отрисовка контейнера категорий
const categoriesWraper = document.querySelector('.categoriesWraper');

function drawCategories() {
    for (let i = 0; i < categories.length; i++) {
        
        const category = document.createElement('div');
        category.classList.add('category','category' + i, 'rounded', 'border', 'col', 'm-2');
        category.categoryId = categories[i]._id;

        category.innerHTML = categories[i].nameCategory;

        // const nameCategory = document.createElement('p');
        // nameCategory.innerHTML = categories[i].nameCategory;
        // category.append(nameCategory)
        
        categoriesWraper.append(category)
        const categoryStyle =  document.querySelector('.category' + i)
        categoryStyle.style.backgroundColor = categories[i].colorCategory
        categoryStyle.style.cursor = 'pointer';

        // console.log(categories[i].colorCategory)
       
        
    }
}


// Создание категорий с заненсением в БД
document.forms['createCategory'].addEventListener('submit', (event) => {
    event.preventDefault();

    const dataFromcreateCategoryForm = new FormData(document.forms.createCategory);
    console.log(dataFromcreateCategoryForm)

    fetch('http://localhost:3005/createNewCategory', { method: "post", body: dataFromcreateCategoryForm })
    .then(data => data.json())
    .then(data => {
        console.log(data)
    })
    categoriesWraper.innerHTML =  '';
    getAllCategories();
})


document.querySelector('.categoriesWraper').addEventListener('click', event =>{
    
    // console.log(event.target.categoryId);
    let categoryId = event.target.categoryId;
    // console.log(categoryId)
    if (!categoryId) return;
        
        // document.querySelector("#exampleModalLabel").innerHTML = 'rrr'
        // document.querySelector("[data-bs-target='#exampleModal']").click()
        // let myModalEl = document.getElementById('exampleModal')

    // for (let j =0; j < categories.length; j++) {
        
    // }
    let currentCategoryName = categories.find(city => city._id === categoryId).nameCategory;
    document.querySelector('#updateCategory').value = currentCategoryName;
    
    let currentCategoryColor = categories.find(city => city._id === categoryId).colorCategory;
    // document.querySelector('')
    document.querySelector('#updateColorCategory').value = currentCategoryColor;
   
    // console.log(currentCategoryName)
    new bootstrap.Modal(document.getElementById('updateCategoryModal')).show();
    
})


// document.forms['updateCategory'].addEventListener('submit', event => {
//     event.preventDefault();
//     const updateCategoryForm = new FormData(document.forms.updateCategory);
//     console.log(updateCategoryForm)
//     // fetch('http://localhost:3005/updateCategory/' + categoryId, { method: "put", body: updateCategoryForm})
    
//     //     .then(data => data.json())
//     //     .then(data => {
//     //             console.log(data)
//     //         })
        
//     //     categoriesWraper.innerHTML =  '';
//     //     getAllCategories();
            
//     //     })
        






// удаление категории

// document.querySelector('.categoriesWraper').addEventListener('click', event =>{
    
//     // console.log(event.target.categoryId);
//     let id = event.target.categoryId;
//     // console.log(id)
//     if (!id) return;

//     console.log('http://localhost:3005/deleteCategory/' + id)
//     fetch('http://localhost:3005/deleteCategory/' + id, { method: "delete"})
//     .then(data => data.json())
//     .then(data => {
    //         console.log(data)
    //     })
    
    //     categoriesWraper.innerHTML =  '';
    //     getAllCategories();
    
    
    // })
    
    
    
    
    // let myModalEl = document.getElementById('exampleModal')
    
    // myModalEl.innerHTML = '';
    // new bootstrap.Modal(document.getElementById('exampleModal')).show();