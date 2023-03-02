import { DataTypes } from "sequelize";
import sequelize from "../db/config/db";

export const ImobiliariaModel = sequelize.define(
  "Imobiliarias",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    cnpj: { type: DataTypes.STRING, allowNull: false },
    creci: { type: DataTypes.STRING, allowNull: false },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    tableName: "Imobiliarias",
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
    },
  }
);
