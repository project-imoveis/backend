import { DataTypes } from "sequelize";
import sequelize from "../db/config/db";

export const CorretorModel = sequelize.define(
  "Corretores",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    cpf: { type: DataTypes.STRING, allowNull: false },
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
    tableName: "Corretores",
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
    },
  }
);
