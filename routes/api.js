var express = require('express');
var app = express();
var config = require("./DatabaseConn/dbconnect");
const sql = require("mssql");
var router = require('express').Router();
const jwt = require('jsonwebtoken');
const secretKey = "Itistopsecret";

router.get('/user',async(req,res)=>{
    try{
        let pool = await sql.connect(config);
        let result = await sql.query('SELECT * FROM UserMaster_Yashvi')
        res.json(result.recordset);
    }catch(err){
        console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server error" });
    }    
});

router.get('/task',async(req,res)=>{
    try{
        let pool = await sql.connect(config);
        let result = await sql.query('SELECT * FROM Task_Yashvi')
        res.json(result.recordset);
    }catch(err){
        console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server error" });
    }    
});


router.post("/", (req, res) => {
    const user = {
        // id: 1,
        // username: "Yashvi",
        username: "yashvi@spec.com",
        password:"123456"
    };
    jwt.sign({ user }, secretKey, (err, token) => {
        res.json({
            token
        });
    });
  });

  router.get("/user/:Id", async (req, res) => {
    const { Id } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .query('SELECT * FROM UserMaster_Yashvi WHERE IdUser = @Id');
        res.json(result.recordset);
    } catch (err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ error: "Internal Server error" });
    }
});

router.get("/task/:Id", async (req, res) => {
    const { Id } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool
            .request()
            .input("Id", sql.Int, Id)
            .query('SELECT * FROM Task_Yashvi WHERE Id = @Id');
        res.json(result.recordset);
    } catch (err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ error: "Internal Server error" });
    }
});

router.post('/addTask',async(req,res)=>{
    try{
        let Data = req.body;
        let pool = await sql.connect(config);
        let result = await pool
        .request()
        .input('Title',sql.NVarChar,Data.Title)
        .input('Description',sql.NVarChar,Data.Description)
        .input('Priority',sql.NVarChar,Data.Priority)
        .input('EstimatedHours', sql.Float, Data.EstimatedHours)
        .input('Status', sql.NVarChar, Data.Status)
        .query(
            'INSERT INTO Task_Yashvi (Title, Description, Priority, EstimatedHours, Status) VALUES (@Title, @Description, @Priority, @EstimatedHours, @Status); ')
          res.json(result.recordset);
    }catch(err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ error: "Internal Server error" });

    }
});


router.delete("/task/:Id",async(req,res)=>{
    const {Id}= req.params;
    try{
        let pool = await sql.connect(config);
        let result = await pool
        .request()
        .input("Id",sql.Int,Id)
        .query("DELETE FROM Task_Yashvi WHERE Id = @Id")
        res.json({message:"Task Deleted Sucessfully"})
    }catch(err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ error: "Internal Server error" });
    }
});

router.put('/Updatetask/:Id',async(req,res)=>{
    const { Id}= req.params;
    const updateData = req.body
    try{
        let pool = await sql.connect(config);
        let result = await pool
        .request()
        .input("Id",sql.Int,Id)
        .input('Title',sql.NVarChar,updateData.Title)
        .input('Description',sql.NVarChar,updateData.Description)
        .input('Priority',sql.NVarChar,updateData.Priority)
        .input('EstimatedHours', sql.Float, updateData.EstimatedHours)
        .input('Status', sql.NVarChar, updateData.Status)
        .query(
            'UPDATE Task_Yashvi SET Title=@Title, Description=@Description, Priority=@Priority, EstimatedHours=@EstimatedHours, Status=@Status WHERE Id = @Id')
          res.json({ message: "Record Updated successfully" });
    }catch(err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ error: "Internal Server error" });

    }
});

module.exports= router;