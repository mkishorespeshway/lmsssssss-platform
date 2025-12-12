import categoriesService from "../services/categoriesService.js";

const list = async (req, res, next) => {
  try {
    const items = await categoriesService.list();
    res.json(items);
  } catch (e) {
    next(e);
  }
};

export default { list };
