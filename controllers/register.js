const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    if ( !email || !name || !password) { // if something's empty, it'll return true
        return res.status(400).json('Data empty or invalid'); // to end execution inside a function, don't forget to return, otherwise it'll throw an error
    }
    if (!email.includes('@')) {
        return res.status(400).json('Invalid email format');
    }
    const hash = bcrypt.hashSync(password);
    return db.transaction(trx => {
        trx.insert({
            hash: hash, 
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
};

export default handleRegister;