function FilterProperties(properties, type, filter) {
  let propertiesFiltered;
  if (type == "value") {
    propertiesFiltered = properties.filter((property) => property[type] < filter);
  } else if (type == "Images") {
    propertiesFiltered = properties.filter((property) => property[type].length >= filter);
  } else {
    propertiesFiltered = properties.filter((property) => property[type] === filter);
  }
  return propertiesFiltered;
}
module.exports = FilterProperties;
