import { DataTypes } from "sequelize";
import sequelize from "../db/config/db";

export const ImovelModel = sequelize.define(
  "Imoveis",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_usuario: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    iptu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    area_util: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipo_de_anuncio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_de_uso: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "Imoveis",
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["createdAt", "DESC"]],
    },
  }
);
