
const express = require('express')
const request = require('request')
const path = require('path')
const app = express()
const port =procees.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public')
console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))

app.get('/TotalCases',(req,res)=>{
        const url ='https://covid19.mathdro.id/api';
        request({url:url},(error,response)=>{
        if(error)
        {
            return console.log(error)
        }
        
         console.log(response.body)
         res.send(response.body)
      })
      
   
})

app.get('/countryNames',(req,res)=>{
    const url ='https://covid19.mathdro.id/api/countries/';
    request({url:url},(error,response)=>{
    if(error)
    {
        return console.log(error)
    }
    
     console.log()
     res.send(response.body)
  })
  

})



    app.get('/countryDetails',(req,res)=>{
        const x= req.query;
        const url ='https://covid19.mathdro.id/api/countries/'+x.countryName+'/';
        request({url:url},(error,response)=>{
        if(error)
        {
            return console.log(error)
        }
        
         console.log(response)
         res.send(response.body)
      })
      
    
    })

  
app.get('/',(req,res)=>{
    res.send("ExpressJs")
})


app.listen(port,()=>{
    console.log("localhost is running at port no 3000")
})