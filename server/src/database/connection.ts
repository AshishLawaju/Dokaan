import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import envConfig from "../config/config";
import User from "../models/user.model";
import Product from "../models/product.model";
import Category from "../models/category.model";

const sequelize = new Sequelize(envConfig.connectionString as string, {
  dialect: "postgres",
  models: [User, Product, Category],
  // models:["../models"]
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PG database");

    await sequelize.sync({ force: false, alter: true });
    console.log("DB synced");
  } catch (error: any) {
    console.error("Failed to connect or sync DB:", error.message);
  }
})();


//relationship

Product.belongsTo(Category)
Category.hasOne(Product)


// try {
//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log("connected to PG database");
//     })
//     .catch((err) => console.log(`failed to connect PG ${err.message}`));

//   sequelize
//     .sync({
//       force: false,
//     })
//     .then(() => console.log("db sync"));
// } catch (error) {
//   console.log("failed to connected PG");
// }

export default sequelize;
