import coursesService from "../services/coursesService.js";

const list = async (req, res, next) => {
  try {
    const items = await coursesService.list();
    res.json(items);
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const item = await coursesService.get(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(item);
  } catch (e) {
    next(e);
  }
};

export default { list, get };
