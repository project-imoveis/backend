import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/db";
import ImovelModel from "./ImovelModel";

class CorretorModel extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
  public creci!: string;
  public email!: string;
  public tel!: string;
}

CorretorModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Corretores",
    sequelize,
  }
);
CorretorModel.hasMany(ImovelModel, {
  foreignKey: "id_corretor",
  sourceKey: "id",
});
export default CorretorModel;
