//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db

//utilizar o objeto de banco de dados, para nessas operações
//serialize roda uma sequencia de codigo
/*db.serialize(() => {
    //criar uma tabela com comandos sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image  TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    
    `)
    //inserir dados da tabela
    const query =
            `INSERT INTO places (
                name,
                image,
                adress,
                adress2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);`
 
    const values = [
        "Colectoria",
        "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1461&q=80",
        "Guilherme genballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletônicos, Lâmpadas"
    ]        
 
   function afterInsertData(err) {
       if(err){
           return console.log(err)
       }
       console.log("cadastrado com sucesso")
       console.log(this)
   }
    
    //db.run(query, values, afterInsertData)      
    
   // consultar os dados da tabela
   
   db.run(`DELETE FROM places WHERE id = ?`,[13], function(err){
    if(err){
        return console.log(err)
    }
    console.log("Deletado com sucesso")

})
   
   
   db.all(`SELECT * FROM places`, function(err,rows){
       if(err){
           return console.log(err)
       }
       console.log("Aqui estao seus registros: ")
       console.log(rows)
   } )


    // deletar um dado da tabela


})*/