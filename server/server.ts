import adminSeeder from "./adminSeeder";
import app from "./src/app";
import envConfig from "./src/config/config";

function startServer(){
    adminSeeder()
    app.listen(envConfig.port,()=>{
        console.log(`server started at ${envConfig.port}`)
    })
}


startServer()