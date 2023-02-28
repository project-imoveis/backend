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
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email inválido",
        },
      },
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
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
    defaultScope: {
      order: [["id", "ASC"]],
      where: { ativo: true },
      attributes: { exclude: ["password", "deletedAt", "createdAt", "updatedAt"] },
    },
    scopes: {
      all: {
        where: {},
        attributes: { exclude: ["password", "deletedAt", "createdAt", "updatedAt"] },
      },
      verifyPassword: {
        where: {},
        attributes: { include: ["password"] },
      },
    },
  }
);

UsuarioModel.hasMany(ImovelModel, {
  foreignKey: "id_usuario",
  sourceKey: "id",
});
export default UsuarioModel;
