import axios from "../../utils/axios";

const getOptions = async (tableName, label, val, isData) => {
  let selectListIdName = [];
  const arr = await axios.get(`/${tableName}`);
  let aLabel = label || "name";
  let aValue = val || "uuid";
  let data = isData ? arr.data : arr.data.data;
  data.map((item) => {
    selectListIdName.push({
      value: item[aValue],
      label: item[aLabel],
    });
  });
  return selectListIdName;
};
const getDefaultValue = async (tableName, parent_name, id, label, val) => {
  const arr = await axios.get(`/${tableName}/${id}`);
  let aLabel = label || "name";
  let aValue = val || "uuid";
  let defaultOption = {};
  if (arr.data[parent_name]) {
    defaultOption = {
      label: arr.data[parent_name]?.[aLabel],
      value: arr.data[parent_name]?.[aValue],
    };
  }
  return defaultOption;
};

const getDefaultValueForType = async (tablename, id) => {
  const arr = await axios.get(`/${tablename}/${id}`);
  const types = await axios.get(`/filters/types`);
  console.log(types.data);
  let defaultOption = {};
  if (arr.data.type) {
    defaultOption = {
      label: types.data.find((item) => item.value === arr.data.type)?.name,
      value: types.data.find((item) => item.value === arr.data.type)?.value,
    };
  }
  console.log(defaultOption);
  return defaultOption;
};

const getDefaultValueByName = async (arr, param, label, val) => {
  let aLabel = label || "name";
  let aValue = val || "uuid";
  let defaultOption = {};
  if (arr.data[param]) {
    defaultOption = {
      label: arr.data[param]?.[aLabel],
      value: arr.data[param]?.[aValue],
    };
  }
  return defaultOption;
};

module.exports = {
  getOptions,
  getDefaultValue,
  getDefaultValueForType,
  getDefaultValueByName,
};
