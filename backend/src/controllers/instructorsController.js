import Instructor from "../models/Instructor.js";

const list = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const instructors = await Instructor.find(query);
    res.json(instructors);
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      res.status(404).json({ message: "Instructor not found" });
      return;
    }
    res.json(instructor);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, title, category, image, level, levelVideos } = req.body;
    const newInstructor = new Instructor({
      name,
      title,
      category,
      image,
      level,
      levelVideos: levelVideos || {
        Beginner: { videos: [], videoDuration: "" },
        Intermediate: { videos: [], videoDuration: "" },
        Advanced: { videos: [], videoDuration: "" },
      },
    });
    await newInstructor.save();
    res.status(201).json(newInstructor);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, title, category, image, level, levelVideos } = req.body;
    const updateFields = {
      name,
      title,
      category,
      image,
      level,
    };

    if (levelVideos) {
      updateFields.levelVideos = levelVideos;
    }

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    console.log("Updated Instructor in backend:", updatedInstructor);
    if (!updatedInstructor) {
      res.status(404).json({ message: "Instructor not found" });
      return;
    }
    res.json(updatedInstructor);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!deletedInstructor) {
      res.status(404).json({ message: "Instructor not found" });
      return;
    }
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export default { list, get, create, update, remove };
