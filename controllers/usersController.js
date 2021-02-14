exports.signUp = (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Users account succesfully created",
        data: {},
        error: []
    });
};