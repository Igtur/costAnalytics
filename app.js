const express = require('express')
const app = express()
const port = 3005

app.use(express.static('public'));
app.use(express.static('files'))
app.use(express.json());


const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "myappdb"
client.connect();
db = client.db(dbName);





app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const mainMenu = [
  {
    menuItemTitle: "Main",
    menuRout: '/main'
  },
  {
    menuItemTitle: "Categories",
    menuRout: '/categories'
  },
  {
    menuItemTitle: "Monthly",
    menuRout: '/monthly'
  },

]

app.get('/categories', (req, res) => {
  res.render('categories', {
    title: "Категории", menu: mainMenu
  })
})

app.get('/main', (req, res) => {
  res.render('main', { title: "Главная" , menu: mainMenu})
})

app.get('/monthly', (req, res) => {
  res.render('monthly', { title: "По месяцам" , menu: mainMenu})
})



app.get('/categoriesData', async (req, res) => {
  let temp = db.collection('categories');
  categories = await temp.find().toArray();
  res.json({categories })
  
})

app.get('/cData', async (req, res) => {
  let temp = db.collection('categories');
  categories = await temp.find().toArray();
  res.render('cData', {arr:categories})

})



