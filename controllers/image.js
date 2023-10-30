const handleImageSubmit = (db) => (req, res) => {
    const { id } = req.body;
    return db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json('Unable to get entries');
    })
}

export default handleImageSubmit;