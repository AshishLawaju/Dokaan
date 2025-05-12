import { configDotenv } from "dotenv";
import { ForeignKey, Sequelize } from "sequelize-typescript";
import envConfig from "../config/config";
import User from "../models/user.model";
import Product from "../models/product.model";
import Category from "../models/category.model";
import Order from "../models/order.model";
import Payment from "../models/paymentMethod.model";
import OrderDetails from "../models/orderDetails.model";

const sequelize = new Sequelize(envConfig.connectionString as string, {
  dialect: "postgres",
  models: [User, Product, Category,Order,Payment,OrderDetails],
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

Category.hasOne(Product,{foreignKey:"categoryId"})
Product.belongsTo(Category,{foreignKey:"categoryId"})


User.hasMany(Order,{foreignKey:"userId"})  //give capital so use foreign key natra it gives OrderId in table
Order.belongsTo(User,{foreignKey:"userId"}) 

//payment ma order
Order.hasOne(Payment,{foreignKey:"orderId"})
Payment.belongsTo(Order,{foreignKey:"orderId"})

//order
Order.hasOne(OrderDetails,{foreignKey:"orderId"})
OrderDetails.belongsTo(Order,{foreignKey:"orderId"})

Product.hasMany(OrderDetails,{foreignKey:"productId"})
OrderDetails.belongsTo(Product,{foreignKey:"productId"})



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
