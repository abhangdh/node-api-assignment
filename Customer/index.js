var express = require("express");
const res = require("express/lib/response");
var app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json()); 

app.get("/getcustomerslist", (req, res, next) => {
    var jsonfile = fs.readFileSync('customer.json');
    res.json(JSON.parse(jsonfile));
});

app.get("/getcustomer/:name", (req, res, next) => {
    var name = req.params.name;
    console.log(name);
    var jsonfile = fs.readFileSync('customer.json');
    jsonfile = JSON.parse(jsonfile);
    res.json(JSON.parse(jsonfile));
    const customer = jsonfile.filter(user=> user.firstName === name);
    res.json(customer);
});

app.post("/savecustomer",(req,res,next)=>{
    var customer = req.body;
    console.log(customer);
    var jsonfile = fs.readFileSync('customer.json');
    jsonfile = JSON.parse(jsonfile);
    jsonfile.push(customer);
    jsonfile = JSON.stringify(jsonfile)
    fs.writeFileSync('customer.json', jsonfile)
    res.send({success:true,msg:'Customer added successfully'});
});

app.delete("/deletecustomer/:name", (req, res, next) => {
    var name = req.params.name;
    var jsonfile = fs.readFileSync('customer.json');
    jsonfile = JSON.parse(jsonfile);
    const customer = jsonfile.filter(user=> user.firstName !== name);
    fs.writeFileSync('customer.json',JSON.stringify(customer));
    res.send({success:true,msg:'Customer delete successfully'});
});

app.put("/updatecustomer/:name",(req,res,next)=>{
    var name = req.params.name;
    var jsonfile = fs.readFileSync('customer.json');
    var parsejsonfile = JSON.parse(jsonfile);
    //var customer = parsejsonfile.filter(cust=> cust.firstName === name);
    var allcustomer = parsejsonfile.filter(cust=> cust.firstName !== name);
    var newcustomer = req.body;
    allcustomer.push(newcustomer);
    allcustomer = JSON.stringify(allcustomer);
    fs.writeFileSync('customer.json',allcustomer);
    res.send({success:true,msg:'Customer Updated Successfully'});

});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

