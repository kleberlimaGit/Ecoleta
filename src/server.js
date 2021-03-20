const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicaçao
server.use(express.urlencoded({extended: true}))




// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//configurar caminhos da minha aplicação
//pagina inicial
//req: Requisição/ Pedido
//res: Resposta
server.get("/",(req,res)=>{
   return res.render("index.html", { title: "Um titulo"})
})

server.get("/create-point",(req,res)=>{
   // query strings das urls
   console.log(req.query)


   return res.render("create-point.html")


})

server.post("/savepoint",(req,res)=>{

   //req.body para formularios com method POST
   // inserir dados no banco de dados
   const query = `INSERT INTO places(
      name,
      image,
      adress,
      adress2,
      state,
      city,
      items
   ) VALUES(?,?,?,?,?,?,?);`

   const values = [
      req.body.name,
      req.body.image,
      req.body.adress,
      req.body.adress2,
      req.body.state,
      req.body.city,
      req.body.itens
   ]

   function afterInsertData(err){
      if(err){
         console.log(err)
         return res.send("Erro de cadastro")
      }
      return res.render("create-point.html",{saved : true})
   }

   db.run(query,values,afterInsertData)

})


server.get("/search",(req,res)=>{


   const search = req.query.search

   if(search == ""){
      //pesquisa vazia
      return res.render("search-results.html", { total: 0 })
   }

   // pegar os dados do banco de dados
   db.all(`SELECT * FROM places WHERE state = '${search}' COLLATE NOCASE`, function(err, rows){
      if(err){
         return console.log(err)
      }
      const total = rows.length
      //mostrar a pagina html com os dados do banco de dados
      return res.render("search-results.html", {places: rows, total: total})
   })
 
 })

//ligar o servidor
server.listen(3000)