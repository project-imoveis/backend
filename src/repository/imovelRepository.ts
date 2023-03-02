import Models from "../models";

export class ImovelRepository {
  static async getAll() {
    const imoveis = await Models.Imovel.findAll({
      order: [["id", "ASC"]],
    });
    return imoveis;
  }
  static async getById(id: number) {
    const imovel = await Models.Imovel.findByPk(id);
    return imovel;
  }
  static async create(body: any) {
    const {
      id_usuario,
      titulo,
      descricao,
      valor,
      iptu,
      area_util,
      area_total,
      tipo_de_anuncio,
      tipo_de_uso,
    } = body;

    return Models.Imovel.create({
      id_usuario,
      titulo,
      descricao,
      valor,
      iptu,
      area_util,
      area_total,
      tipo_de_anuncio,
      tipo_de_uso,
    });
  }
  static async update(id: number, body: any) {
    const {
      id_usuario,
      titulo,
      descricao,
      valor,
      iptu,
      area_util,
      area_total,
      tipo_de_anuncio,
      tipo_de_uso,
    } = body;

    const imovel = await Models.Imovel.update(
      {
        id_usuario,
        titulo,
        descricao,
        valor,
        iptu,
        area_util,
        area_total,
        tipo_de_anuncio,
        tipo_de_uso,
      },
      {
        where: {
          id,
        },
      }
    );
    return imovel;
  }

  static async delete(id: number) {
    return Models.Imovel.destroy({
      where: {
        id,
      },
    });
  }
}
