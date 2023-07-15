import { DataTypes } from "@sequelize/core";
import db from "../db/config/db";
import { PropertyModel } from "./PropertyModel";
import { CorretorModel } from "./CorretorModel";
import { ImobiliariaModel } from "./ImobiliariaModel";
import { NaturalPersonModel } from "./LegalPersonModel";
import { LegalPersonModel } from "./NaturalPersonModel";
import { AddressModel } from "./AddressModel";
import { ImageModel } from "./ImageModel";

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  user_type: string;
};
export interface IUser {
  name: string;
  email: string;
  password: string;
  telefone: string;
  user_type: string;
}

export const UserModel = db.define(
  "Users",
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
        notNull: {
          msg: "O campo de nome não pode ser nulo.",
        },
        notEmpty: {
          msg: "O campo de nome não pode estar vazio.",
        },
        len: [3, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo de senha não pode ser nulo.",
        },
        notEmpty: {
          msg: "O campo de senha não pode estar vazio.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Formato de email inválido",
        },
        notEmpty: true,
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo de tipo não pode ser nulo.",
        },
        notEmpty: {
          msg: "O campo de tipo não pode estar vazio.",
        },
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Users",
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
        attributes: { include: ["password"], exclude: ["deletedAt", "createdAt", "updatedAt"] },
      },
    },
  }
);
UserModel.hasMany(PropertyModel, {
  foreignKey: {
    name: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  sourceKey: "id",
  scope: {},
  as: "Properties",
});
UserModel.hasMany(ImageModel, {
  foreignKey: {
    name: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  sourceKey: "id",
  scope: {},
  as: "Profile",
});
UserModel.hasMany(AddressModel, {
  foreignKey: {
    name: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  sourceKey: "id",
  scope: {},
  as: "Addresses",
});
UserModel.hasMany(CorretorModel, {
  foreignKey: {
    name: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  sourceKey: "id",
  scope: {},
  as: "Corretor",
});
UserModel.hasMany(ImobiliariaModel, {
  foreignKey: {
    name: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  sourceKey: "id",
  scope: {},
  as: "Imobiliaria",
});
UserModel.hasMany(NaturalPersonModel, {
  foreignKey: {
    name: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  sourceKey: "id",
  scope: {},
  as: "NaturalPerson",
});
UserModel.hasMany(LegalPersonModel, {
  foreignKey: {
    name: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  sourceKey: "id",
  scope: {},
  as: "LegalPerson",
});
