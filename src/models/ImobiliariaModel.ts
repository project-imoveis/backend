import { DataTypes } from "@sequelize/core";
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
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo de cnpj não pode estar vazio",
        },
      },
    },
    creci: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo do creci não pode estar vazio",
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
    tableName: "Imobiliarias",
    paranoid: true,
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
    },
  }
);
