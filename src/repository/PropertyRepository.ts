import { Sequelize, Transaction } from "@sequelize/core";
import database from "../db/config/db";
import Models from "../models";

export class PropertyRepository {
  static async getAll() {
    console.log("getall");
    const properties = await Models.Property.findAll({
      include: [
        { model: Models.Address, as: "Address" },
        { model: Models.Image, as: "Images" },
      ],
      order: [["id", "ASC"]],
    });

    console.log("properties: ", properties);
    return properties;
  }
  static async getById(id: number) {
    const property = await Models.Property.findByPk(id, {
      include: [
        { model: Models.Address, as: "Address" },
        { model: Models.Image, as: "Images" },
      ],
    });
    return property;
  }
  static async create(body: any) {
    const {
      user_id,
      title,
      description,
      value,
      iptu,
      useful_area,
      total_area,
      post_type,
      usage_type,
      unit_type,
      subunit_type,
      address,
    } = body;
    return database.transaction(async (t: Transaction) => {
      const propertyCreated = await Models.Property.create({
        user_id,
        title,
        description,
        value,
        iptu,
        useful_area,
        total_area,
        post_type,
        usage_type,
        unit_type,
        subunit_type,
      });
      const { zipcode, city, state, neighborhood, street } = address;
      const property_id = propertyCreated.getDataValue("id");
      const addressCreated = await Models.Address.create({
        zipcode,
        city,
        state,
        neighborhood,
        street,
        property_id,
        user_id,
      });
      return { propertyCreated, addressCreated };
    });
  }
  static async update(id: number, body: any) {
    const {
      user_id,
      title,
      description,
      value,
      iptu,
      useful_area,
      total_area,
      post_type,
      usage_type,
      unit_type,
      subUnit_type,
    } = body;

    const property = await Models.Property.update(
      {
        user_id,
        title,
        description,
        value,
        iptu,
        useful_area,
        total_area,
        post_type,
        usage_type,
        unit_type,
        subUnit_type,
      },
      {
        where: {
          id,
        },
      }
    );
    return property;
  }

  static async delete(id: number) {
    return Models.Property.destroy({
      where: {
        id,
      },
    });
  }
}
