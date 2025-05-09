import adminSeeder from "./adminSeeder";
import app from "./src/app";
import envConfig from "./src/config/config";
import categoryController from "./src/controllers/categoryController";

function startServer(){
    
    app.listen(envConfig.port,()=>{
        console.log(`server started at ${envConfig.port}`)
        adminSeeder()
        categoryController.seedCategory()
    })
}


startServer()