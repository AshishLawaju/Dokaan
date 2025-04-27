import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    tableName:"Users",
    modelName:"User" ,
    timestamps:true
})


class User  extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column ({
        type:DataType.STRING
    })
    declare username:string

    @Column({
        type : DataType.STRING,

    })
    declare email:string

    @Column ({
        type: DataType.STRING
    })
    declare password : string

    @Column({
        type : DataType.ENUM('customer','admin'),
        defaultValue: 'customer'
        
    })
    declare role : string


    @Column({
        type:DataType.STRING
    })
    declare OTP:string

    @Column({
        type : DataType.STRING
    })
    declare OTPgenerateTime:string
}




export default User