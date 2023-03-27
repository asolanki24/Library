var express = require('express');
var cors = require('cors');

const fetch = (...args) => import("node-fetch").then(({default:fetch}) =>fetch(...args));
var bodyParser = require('body-parser');
const { request, response } = require('express');

const ID = "92fd3047d8b7e6621a7f"
const SECRET = "b5701d5c38f64ea99ec126f9074e7d9dd064c193"

var app = express();


app.use(cors())
app.use(bodyParser.json())

app.get("/getToken", async (req, res)=>{
    await fetch("http://github.com/login/oauth/access_token?client_id="+ID+"&client_secret="+SECRET+"&code="+req.query.code,{
        method:"POST",
        headers:{"Accept":"application/json"}
    }).then((response) => {
        return response.json();
    }).then((data)=>{
        console.log(data)
        res.json(data);
    }
    )
});

app.listen(4000, () =>{
        console.log("Server running ")
})