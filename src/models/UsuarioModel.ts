import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/db";
import ImovelModel from "./ImovelModel";

class UsuarioModel extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
  public creci!: string;
  public email!: string;
  public tel!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

UsuarioModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Usuarios",
    sequelize,
    paranoid: true,
  }
);

UsuarioModel.hasMany(ImovelModel, {
  foreignKey: "id_usuario",
  sourceKey: "id",
});
export default UsuarioModel;
