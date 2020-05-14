const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
//api keys
const api_key_mailchimp="60e1951af4777e1917284175b7aef80d-us4";
const id_audience="ff17acb5a9";

app.use(express.static("public"));
const request=require("request");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signUp.html");
})


app.post("/",(req,res)=>{
    console.log("post received !");
    const F_Name=req.body.F_name;
    const L_Name=req.body.L_name;
    const email=req.body.email;
       
   console.log(req);
   const data={members:[
       {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:F_Name,
            LNAME:L_Name,
        }
       }
   ]};
   const json_data=JSON.stringify(data);
   const url="https://us4.api.mailchimp.com/3.0/lists/"+id_audience;
   const Option={
       method:"POST",
       auth:"Pooja:"+api_key_mailchimp
   }
const request=https.request(url,Option,function(response){
    response.on("data",(data)=>{
        console.log(JSON.parse(data));
        
    })
})
   request.write(json_data);
   request.end();
   if(res.statusCode==200){
    res.sendFile(__dirname+"/success.html");
    }
    else{
    res.sendFile(__dirname+"/failure.html");
    }
})

app.post("/failure",(req,res)=>{
res.redirect("/");
})


app.listen(3000,(req,res)=>{
    console.log("Server started at 3000 ");
})





// <link rel="apple-touch-icon" href="/docs/4.4/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
// <link rel="icon" href="/docs/4.4/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
// <link rel="icon" href="/docs/4.4/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
// <link rel="manifest" href="/docs/4.4/assets/img/favicons/manifest.json">
// <link rel="mask-icon" href="/docs/4.4/assets/img/favicons/safari-pinned-tab.svg" color="#563d7c">
// <link rel="icon" href="/docs/4.4/assets/img/favicons/favicon.ico">
// <meta name="msapplication-config" content="/docs/4.4/assets/img/favicons/browserconfig.xml">
// <meta name="theme-color" content="#563d7c"></meta>
//<link rel="canonical" href="https://getbootstrap.com/docs/4.4/examples/sign-in/">