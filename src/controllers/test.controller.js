exports.getText = (req, res) => {
    res.send('Hello World!');
};

exports.getJson = (req, res) => {
    res.json({ message: 'Hello World!' });
};