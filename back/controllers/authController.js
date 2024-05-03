const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res, next) => {
    const { username, email, password, isAdmin } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }
        user = new User({
            username,
            email,
            password,
            isAdmin
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ email: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ password: 'Password incorrect' });
        }

        const payload = {
            id: user.id,
            username: user.username,
            email:user.email,
            isAdmin:user.isAdmin
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600 }, // 1 hour in seconds
            (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: payload
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


exports.register = register;
exports.login = login;
