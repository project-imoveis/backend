const filterProperties = require("../utils/filter");

const mockInput = [
  {
    id: 17,
    user_id: 14,
    title: "Barraco em Sobradinho",
    description: null,
    value: 200,
    iptu: null,
    useful_area: 135,
    total_area: 135,
    post_type: "Venda",
    usage_type: "Residencial",
    unit_type: "Casa",
    subunit_type: "Padrão",
    Address: {
      id: 5,
      user_id: 14,
      property_id: 17,
      zipcode: "72017900",
      city: "Brasília",
      state: "DF",
      neighborhood: "Taguatinga Norte (Taguatinga)",
      street: "QNB Área Especial 7",
      complement: null,
      number: null,
    },
    Images: [],
  },
  {
    id: 16,
    user_id: 14,
    title: "Kitnet em taguatinga",
    description: null,
    value: 500,
    iptu: null,
    useful_area: 135,
    total_area: 135,
    post_type: "Venda",
    usage_type: "Residencial",
    unit_type: "Apartamento",
    subunit_type: "Kitnet",
    Images: [
      {
        id: 22,
        user_id: 14,
        property_id: 16,
        isMain: true,
        name: "sunset.jpg",
        size: 214523,
        type: "property",
        key: "387790456e452b05573ccf2b_sunset.jpg",
        url: "https://imoveis-upload.s3.sa-east-1.amazonaws.com/387790456e452b05573ccf2b_sunset.jpg",
        subtitles: "Lindo sunset gamer",
      },
    ],
  },
  {
    id: 15,
    user_id: 14,
    title: "Loja com subsolo",
    description: null,
    value: 4000,
    iptu: null,
    useful_area: 135,
    total_area: 135,
    post_type: "Aluguel",
    usage_type: "Comercial",
    unit_type: "Loja",
    subunit_type: "Padrão",
    Images: [],
  },
  {
    id: 14,
    user_id: 1,
    title: "Sobrado no Riacho Fundo 1",
    description: null,
    value: 300,
    iptu: null,
    useful_area: 170,
    total_area: 170,
    post_type: "Aluguel",
    usage_type: "Residencial",
    unit_type: "Casa",
    subunit_type: "Sobrado",
    Images: [],
  },
  {
    id: 13,
    user_id: 31,
    title: "Studio Moderno no ParkSul",
    description: null,
    value: 2500,
    iptu: null,
    useful_area: 60,
    total_area: 60,
    post_type: "Aluguel",
    usage_type: "Residencial",
    unit_type: "Apartamento",
    subunit_type: "Studio",
    Images: [],
  },
];
const mockResponseUnit = [mockInput[0], mockInput[3]];
const mockResponseSubUnit = [mockInput[4]];
const mockResponsePost = [mockInput[0], mockInput[1]];
const mockResponseValue = [mockInput[0], mockInput[1], mockInput[3]];
const mockResponseImage = [mockInput[1]];

describe("filters", () => {
  test("filter by Unit Type: Casa", () => {
    expect(filterProperties(mockInput, "unit_type", "Casa")).toEqual(mockResponseUnit);
  });
  test("filter by Sub Unit Type: Studio", () => {
    expect(filterProperties(mockInput, "subunit_type", "Studio")).toEqual(mockResponseSubUnit);
  });
  test("filter by post type: Venda", () => {
    expect(filterProperties(mockInput, "post_type", "Venda")).toEqual(mockResponsePost);
  });
  test("filter by properties that cost lower than R$ 1.000,00", () => {
    expect(filterProperties(mockInput, "value", 1000)).toEqual(mockResponseValue);
  });
  test("filter by properties that has at least one Image", () => {
    expect(filterProperties(mockInput, "Images", 1)).toEqual(mockResponseImage);
  });
});
