import { DataTypes } from "@sequelize/core";
import sequelize from "../db/config/db";
import { UserModel } from "./UserModel";
import { PropertyModel } from "./PropertyModel";

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
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
