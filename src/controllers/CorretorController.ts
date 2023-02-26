import CorretorModel from "../models/CorretorModel";

export default class CorretorController {
  static async index(req: any, res: any) {
    try {
      const corretor = await CorretorModel.findAll();
      return res.status(200).json(corretor);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  static async show(req: any, res: any) {
    try {
      const { id } = req.params;
      const corretor = await CorretorModel.findByPk(id);
      return res.json(corretor);
    } catch (err) {
      return res.status(404).json({ message: "Corretor não encontrado", err: err });
    }
  }

  static async store(req: any, res: any) {
    try {
      const { name, password, creci, email, tel } = req.body;
      const corretor = await CorretorModel.create({
        name,
        password,
        creci,
        email,
        tel,
      });
      return res.status(201).json(corretor);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao criar corretor", err: err });
    }
  }

  static async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const { name, password, creci, email, tel } = req.body;
      const corretor = await CorretorModel.update(
        {
          name,
          password,
          creci,
          email,
          tel,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.json(corretor);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao atualizar corretor", err: err });
    }
  }

  static async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      const corretor = await CorretorModel.destroy({
        where: {
          id,
        },
      });
      return res.json(corretor);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao deletar corretor", err: err });
    }
  }
}
