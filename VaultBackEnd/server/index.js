const express = require('express');
const app = express();
const cors = require('cors')
const authenticationRoute = require('./routes/authenticationRoute')
const uploadImageRoute = require('./routes/uploadImageRoute')
const getImageRoute = require('./routes/getImageRoute')

const {MONGODB_URL, PORT} = require('./config/serverConfig')
const {connectDB} = require('./db/connect')

app.use(cors())
app.use(express.json())

app.use('/api',authenticationRoute)
app.use('/api',uploadImageRoute)
app.use('/api',getImageRoute)


async function serverStart(){
try{
    await connectDB(MONGODB_URL)
    console.log("Database connected")
app.listen(PORT,()=>{
    console.log("Server is running")
})
}   catch(error){
    console.log(error)

    
}
}

serverStart()