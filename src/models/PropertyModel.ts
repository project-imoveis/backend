import { DataTypes } from "sequelize";
import sequelize from "../db/config/db";

export const PropertyModel = sequelize.define(
  "Properties",
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    iptu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    useful_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    post_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usage_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subunit_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Properties",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["createdAt", "DESC"]],
    },
  }
);
