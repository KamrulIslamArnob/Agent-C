exports.getJson = async (req, res) => {
    return res.status(200).json(
        {
            "message":"Api working!"
        }
    );
};


exports.getText = async (req, res) => {
    return res.status(200).send("Api working!");
}