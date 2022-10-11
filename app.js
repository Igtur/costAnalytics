"use strict"

const express = require('express')
const app = express()
const port = 3005

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use(express.static('public'));
app.use(express.static('files'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "myappdb"
client.connect();
const db = client.db(dbName);





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
  res.render('main', { title: "Главная", menu: mainMenu })
})

app.get('/monthly', (req, res) => {
  res.render('monthly', { title: "По месяцам", menu: mainMenu })
})



app.get('/categoriesData', async (req, res) => {
  let temp = db.collection('categories');
  let categories = await temp.find().toArray();
  res.json({ categories })

})

// app.get('/cData', async (req, res) => {
//   let temp = db.collection('categories');
//   categories = await temp.find().toArray();
//   res.render('cData', {arr:categories})


app.post('/createNewCategory', upload.none(), async (req, res) => {
  // const dataFromcreateCategoryForm = req.body;
  let createCategory = db.collection('categories');
  let obj = await createCategory.insertOne({ ...req.body });
  console.log({ ...req.body });
  res.json({ m: "ok" })

})

app.delete('/deleteCategory/:id', async (req, res) => {

  // const dataFromcreateCategoryForm = req.body;

  let deleteCategory = db.collection('categories');
  // try {
  // } catch (error) { console.error(error); }

  let obj = await deleteCategory.deleteOne({ _id: ObjectId(req.params.id) });
  res.json({ m: "ok" })
});



app.put('/updateCategory/:id', async (req, res) => {

  // const dataFromcreateCategoryForm = req.body;

 console.log(req.body);
  // console.log({ ...req.body });

  const updateCategory = db.collection('categories');
  // try {
  // } catch (error) { console.error(error); }

  // const obj = await updateCategory.updateOne({ _id: ObjectId(req.params.id) });
  res.json({ m: "ok" })
})





