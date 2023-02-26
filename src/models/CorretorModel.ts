import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/db";

class CorretorModel extends Model {}

CorretorModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creci: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "corretor",
    timestamps: false,
    sequelize,
  }
);
export default CorretorModel;
