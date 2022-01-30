const fs = require('fs')
const url = require('url')
const http = require('http')

http.createServer((req, res) => {
    if (req.url == "/") {
        res.setHeader("content-type", "text/html");
        fs.readFile("index.html", "utf-8", (err, data) => {
            res.end(data);
        });
    }

//variables
    const{ nombre, precio } = url.parse(req.url, true).query
    let deporte = { nombre, precio }; 
    
    //console.log(deporte)
if (req.url.startsWith("/agregar")) {
    let data = JSON.parse(fs.readFileSync("deportes.json", "utf-8"))
    let deportes = data.deportes
        deportes.push(deporte)
        fs.writeFileSync("deportes.json", JSON.stringify(data))
        res.end()
}
    
//leer
    if (req.url.startsWith("/deportes")) {
        res.writeHead(200, {"Content-type": "text/html"})
        fs.readFile("deportes.json", "utf-8", (err, data) => {
            res.end(data)
            //console.log(data)
        })    
    }
//editar
    if (req.url.startsWith ("/editar")) {
        let data = JSON.parse(fs.readFileSync("deportes.json", "utf-8"))
        let deportes = data.deportes
        let index = deportes.findIndex(data => data.nombre==deporte.nombre);
        deportes[index].precio = deporte.precio;
        fs.writeFileSync("deportes.json", JSON.stringify(data))
        res.end()  
    }

//eliminar
    if (req.url.startsWith ("/eliminar")) {
        let data = JSON.parse(fs.readFileSync("deportes.json", "utf-8"))
        let deportes = data.deportes
        deportes.forEach(function(currentValue, index, arr){
               if(deportes[index].nombre == deporte.nombre){
                   deportes.splice(index, 1);
               }
        })
        fs.writeFileSync("deportes.json", JSON.stringify(data))
        res.end()    
    }
    
}).listen(3000, () => console.log('UP!'))











