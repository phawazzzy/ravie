exports.postApartment = async (req, res) => {
  try {
    const { name, address } = req.body;
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "bad request",
      data: null,
      errors: [error.message]
    });
  }
};
