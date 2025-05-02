import envConfig from "./src/config/config";
import User from "./src/models/user.model";
import bcrypt from "bcrypt"
const adminSeeder = async () => {
  try {
    const [data] = await User.findAll({
      where: {
        email: envConfig.adminEmail,
      },
    });

    if (!data) {
              const hash = await bcrypt.hash(envConfig.adminPassword as string,  11);
        
      await User.create({
        username: envConfig.adminUsername,
        password: envConfig.adminPassword,
        email: envConfig.adminEmail,
        role: "admin",
    });
    console.log("Admin seeded!");
    }else{
        console.log("admin already seeded");
        
    }

  } catch (error) {}
};

export default adminSeeder;
