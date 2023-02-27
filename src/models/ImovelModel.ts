import { Model, DataTypes, ForeignKey } from "sequelize";
import sequelize from "../db/config/db";
import CorretorModel from "./CorretorModel";

class ImovelModel extends Model {
  public id!: number;
  public id_corretor!: ForeignKey<number>;
  public titulo!: string;
  public descricao!: string;
  public valor!: number;
  public iptu!: number;
  public area_util!: number;
  public area_total!: number;
  public tipo_de_anuncio!: string;
  public tipo_de_uso!: string;
}

ImovelModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_corretor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    iptu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    area_util: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipo_de_anuncio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_de_uso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Imoveis",
    timestamps: false,
    sequelize,
  }
);
ImovelModel.belongsTo(CorretorModel, { foreignKey: "id_corretor" });
export default ImovelModel;
