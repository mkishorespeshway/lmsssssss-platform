import Course from "../models/Course.js";

const list = async (query = {}) => {
  const items = await Course.find(query).lean();
  return items;
};

const get = async (id) => {
  const item = await Course.findById(id).lean();
  return item;
};

export default { list, get };
