import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  Validate,
} from "sequelize-typescript";
import { PaymentMethod } from "../globals/types";

@Table({
  modelName: "Payment",
  tableName: "payment",
  timestamps: true,
})
class Payment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM(
      PaymentMethod.COD,
      PaymentMethod.Khalti,
      PaymentMethod.Esewa
    ),

    defaultValue: PaymentMethod.COD,
  })
  declare paymentMethod: string;


  @Column({
    type : DataType.ENUM("paid","unpaid"),
    defaultValue : "unpaid"
  })

  declare paymentStatus : string


  
}

export default Payment