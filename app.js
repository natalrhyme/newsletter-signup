const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
 

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res){
    
    var firstName = req.body.fname
    var lastName = req.body.lname
    var email = req.body.email

    var data = {
        members:[
            {
             email_address: email,
            status:"subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        
        }
        ]
    };

    var jsonData = JSON.stringify(data);

var option = {
    url: "https://us5.api.mailchimp.com/3.0/lists/f01c99b2f8",
    method:"POST",
    headers:{
        "Authorization":"natalrhyme  9cff6dce075cfada91cf30b5c264280e-us5"
    },
    body: jsonData

};


request(option,function(error, response, body){
    if(error){
        res.send(__dirname + "/failure.html")
        }
        else {
            if(response.statusCode === 200){
                res.send(__dirname + "/success.html")
            }
            else{
                res.sendFile(__dirname + "/failure.html")
            }
        }

});


});


app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT ,function(){
    console.log("server is running on port 3000");
});


// f01c99b2f8

// 04909655f2cb688530f93e41e40fbf39-us5