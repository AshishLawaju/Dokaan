import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import envConfig from "../config/config";


const sequelize = new Sequelize(envConfig.connectionString as string) 


try {
    sequelize.authenticate().then(()=>{
        console.log('connected to PG database');
        
    }).catch(err=>console.log(
        `failed to connect PG ${err.message}`
    )
    
    )
} catch (error) {
    console.log('failed to connected PG');
    
}



export default sequelize