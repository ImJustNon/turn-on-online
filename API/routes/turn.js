const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlEncoded = bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
});
const db = require("../database/connect.js");
const config = require("../config");

router.get("/api/turn/:turn", urlEncoded, async (req, res) => {
    const { turn } = req.params ?? {};
    if(!turn){
        return res.json({
            status: "FAIL",
            error: "Invalid params",
        });
    } 

    if(turn.toLowerCase() === "on"){
        let stutus = setTurnOn();
        if(stutus == "FAIL"){
            return res.json({
                status: "FAIL",
                error: null,
            });
        }
        res.json({
            status: "SUCCESS",
            error: null,
        });
    }
    else if(turn.toLowerCase() === "off"){
        let stutus = setTurnOff();
        if(stutus == "FAIL"){
            return res.json({
                status: "FAIL",
                error: null,
            });
        }
        res.json({
            status: "SUCCESS",
            error: null,
        });
    }
});

module.exports = router;


function setTurnOn(){
    const checkLatestData = db.prepare('SELECT * FROM turn_on_api').all();

    // ถ้าเกิดมี้ค่าเป๋น OFF ให้ UPDATE database เป็น ON 
    if(checkLatestData[0].status === 0){
        db.exec(`UPDATE turn_on_api SET status=1 WHERE id=${config.database.id}`);
        return "SUCCESS";
    }
    if(checkLatestData[0].status === 1){
        return "FAIL";
    }
}

function setTurnOff(){
    const checkLatestData = db.prepare('SELECT * FROM turn_on_api').all();

    // ถ้าเกิดมี้ค่าเป๋น OFF ให้ UPDATE database เป็น ON 
    if(checkLatestData[0].status === 1){
        db.exec(`UPDATE turn_on_api SET status=0 WHERE id=${config.database.id}`);
        return "SUCCESS";
    }
    if(checkLatestData[0].status === 0){
        return "FAIL";
    }
}