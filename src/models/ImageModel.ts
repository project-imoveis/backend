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
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blob: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    extension: {
      type: DataTypes.ENUM,
      values: ["jpg", "jpeg", "png"],
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["profile", "property"],
      allowNull: false,
    },
  },
  {
    modelName: "Images",
    timestamps: true,
  }
);
