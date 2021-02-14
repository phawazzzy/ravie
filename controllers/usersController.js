exports.signUp = (req, res) => {
  console.log("hello user");
  return res.status(200).json({
    status: true,
    message: "Users account succesfully created",
    data: {},
    error: []
  });
};
