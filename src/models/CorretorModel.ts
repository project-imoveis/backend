import { DataTypes } from "@sequelize/core";
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
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "cpf não pode ser nulo",
        },
      },
    },
    creci: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "creci não pode ser nulo",
        },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Corretores",
    paranoid: true,
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
    },
  }
);
