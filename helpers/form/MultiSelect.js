const getDefaultOptions = (data, defaultData, label, value) => {
  let result = [];
  data?.map((item) => {
    defaultData.map((defaultItem) => {
      if (item[value] === defaultItem[value]) {
        result.push({
          label: item[label],
          value: item[value],
        });
      }
    });
  });
  return result;
};

const getSelectList = (data, label, value) => {
  let result = [];
  label = label || "name";
  value = value || "uuid";
  data.map((item) => {
    result.push({
      value: item[value],
      label: item[label],
    });
  });
  return result;
};

module.exports = { getDefaultOptions, getSelectList };
