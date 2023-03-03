import Models from "../models";

export class PropertyRepository {
  static async getAll() {
    const properties = await Models.Property.findAll({
      order: [["id", "ASC"]],
    });
    return properties;
  }
  static async getById(id: number) {
    const property = await Models.Property.findByPk(id);
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
    } = body;

    return Models.Property.create({
      user_id,
      title,
      description,
      value,
      iptu,
      useful_area,
      total_area,
      post_type,
      usage_type,
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
