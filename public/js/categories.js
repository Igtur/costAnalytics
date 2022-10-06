
let categories = [
    
];

fetch('http://localhost:3005/categoriesData')
.then(data=>data.json())
.then(data=>{
    console.log(data);
    categories= data.categories

    draw()
})

// fetch('http://localhost:3005/cData')
// .then(data=>data.text())
// .then(data=>{
//     // console.log(data);
//     // categories= data.categories
//     document.querySelector('.wraperPage').innerHTML=data
// })


const wraperPage = document.querySelector('.wraperPage');
// wraperPage.innerHTML =  '';

function draw(){
for (let i = 0; i < categories.length; i++) {

const category = document.createElement('div');
category.classList.add('category');
// category.style.bacground-color = categories[i].color;

const nameCategory = document.createElement('p');
nameCategory.innerHTML = categories[i].name;
category.append(nameCategory)

wraperPage.append(category)

document.getElementsByClassName('category')[i].style.bacgroundColor = "red"
}
const btnAddCategory = document.createElement('button')
btnAddCategory.classList.add('btn', 'btn-primary');
btnAddCategory.innerHTML = 'Add category';
wraperPage.append(btnAddCategory)
}

// let a = document.getElementsByClassName('category');

