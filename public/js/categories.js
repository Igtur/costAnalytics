
let categories = [
    
];

fetch('http://localhost:3005/categoriesData')
.then(data=>data.json())
.then(data=>{
    console.log(data);
    categories= data.categories

    drawCategories()
})

// метод для расшаривания паг файла
// fetch('http://localhost:3005/cData')
// .then(data=>data.text())
// .then(data=>{
//     // console.log(data);
//     // categories= data.categories
//     document.querySelector('.wraperPage').innerHTML=data
// })


const categoriesWraper = document.querySelector('.categoriesWraper');
// wraperPage.innerHTML =  '';

function drawCategories(){
for (let i = 0; i < categories.length; i++) {

const category = document.createElement('div');
category.classList.add('category', 'rounded', 'border');
// category.style.bacground-color = categories[i].color;

const nameCategory = document.createElement('p');
nameCategory.innerHTML = categories[i].name;
category.append(nameCategory)

categoriesWraper.append(category)

document.getElementsByClassName('category')[i].style.bacgroundColor = "red"
}
// const btnAddCategory = document.createElement('button')
// btnAddCategory.classList.add('btn', 'btn-primary');
// btnAddCategory.innerHTML = 'Add category';
// wraperPage.append(btnAddCategory)
}

// let a = document.getElementsByClassName('category');

