import { DataTypes } from "sequelize";
import db from "../db/config/db";
import { ImovelModel } from "./ImovelModel";
import { CorretorModel } from "./CorretorModel";
import { ImobiliariaModel } from "./ImobiliariaModel";
import { PessoaFisicaModel } from "./PessoaFisicaModel";
import { PessoaJuridicaModel } from "./PessoaJuridicaModel";
export const UsuarioModel = db.define(
  "Usuario",
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
    tipo_de_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Usuarios",
    paranoid: true,
    timestamps: true,
    defaultScope: {
      order: [["id", "ASC"]],
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
  scope: {},
  as: "Imoveis",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UsuarioModel.hasMany(CorretorModel, {
  foreignKey: "id_usuario",
  sourceKey: "id",
  scope: {},
  as: "Corretor",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UsuarioModel.hasMany(ImobiliariaModel, {
  foreignKey: "id_usuario",
  sourceKey: "id",
  scope: {},
  as: "Imobiliaria",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UsuarioModel.hasMany(PessoaFisicaModel, {
  foreignKey: "id_usuario",
  sourceKey: "id",
  scope: {},
  as: "PessoaFisica",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UsuarioModel.hasMany(PessoaJuridicaModel, {
  foreignKey: "id_usuario",
  sourceKey: "id",
  scope: {},
  as: "PessoaJuridica",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
