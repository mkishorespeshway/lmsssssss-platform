import analyticsService from "../services/analyticsService.js";

const overview = async (req, res, next) => {
  try {
    const data = await analyticsService.overview();
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export default { overview };
