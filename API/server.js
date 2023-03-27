const express = require("express");
const server = express();

const config = require("./config.js");
const db = require("./database/connect.js");

const bodyParser = require("body-parser");
const urlEncoded = bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
});
const path = require("path");
const fs = require("fs");
const logger = require("morgan");

server.use(urlEncoded);
server.use(express.json({
    limit: "50mb",
}));
server.use(logger("dev"));

fs.readdirSync("./routes").forEach(async files => {
    try {
        let router = require(`./routes/${files}`);
        server.use(router);
        console.log(`[Router] Loaded : ${files}`);
    }
    catch (e){
        console.log(`[Router] Fail to Load : ${files} : ${e}`);
    }
});




server.listen(config.server.port, () =>{
    console.log(`[Server] listening on port : ${config.server.port}`);
});



checkStatus();
function checkStatus(){
    setInterval(() => {
        let rows = db.prepare('SELECT * FROM turn_on_api').all();
        if(rows[0].status === 1){
            db.exec(`UPDATE turn_on_api SET status=0 WHERE id=${config.database.id}`);
            console.log("[ALERT] ✅ : Update data to (OFF)");
        }
        else {
            console.log("[ALERT] ⚠  : No (ON) data found")
        }
    }, 5 * 1000); //วนเช็คทุก 15 วินาที
}