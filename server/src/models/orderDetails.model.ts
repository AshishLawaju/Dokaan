import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  Validate,
} from "sequelize-typescript";

@Table({
  modelName: "OrderDetails",
  tableName: "orderDetails",
  timestamps: true,
})
class OrderDetails extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  
}


export default OrderDetails