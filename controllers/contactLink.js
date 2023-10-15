import contactLink from "../models/contactLink.js";

export const createContactLink = async (req, res, next) => {
  try {
    const newContactLink = await contactLink.create(req.body);
    req.user.contactLinks.push(newContactLink);
    await req.user.save();
    res.status(201).json(newContactLink);
  } catch (error) {
    next(error);
  }
};

export const updateContactLink = async (req, res, next) => {
  try {
    if (!id) {
      const error = new Error("Contact link id is required");
      error.statusCode = 400;
      throw error;
    }
    const { id } = req.params;
    const updatedContactLink = await contactLink.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedContactLink) {
      const error = new Error("Contact link not found");
      error.statusCode = 404;
      throw error;
    }
    req.user.contactLinks.pull(id);
    req.user.contactLinks.push(updatedContactLink);
    await req.user.save();

    res.status(200).json(updatedContactLink);
  } catch (error) {
    next(error);
  }
};
export const deleteContactLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("Contact link id is required");
      error.statusCode = 400;
      throw error;
    }

    const deletedContactLink = await contactLink.findByIdAndDelete(id);
    req.user.contactLinks.pull(id);
    await req.user.save();

    if (!deletedContactLink) {
      const error = new Error("Contact link not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(deletedContactLink);
  } catch (error) {
    next(error);
  }
};
