import instructorsService from "../services/instructorsService.js";

const list = async (req, res, next) => {
  try {
    const items = await instructorsService.list();
    res.json(items);
  } catch (e) {
    next(e);
  }
};

export default { list };
