import { DataTypes } from "sequelize";
import sequelize from "../db/config/db";

export const ImageModel = sequelize.define(
  "Images",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Properties",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    isMain: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "Images",
    timestamps: true,
    defaultScope: {
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);
