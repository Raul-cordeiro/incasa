const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/modeluser'); // Importe o modelo de usuário do seu aplicativo

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return done(null, false, { message: 'Email ou senha incorretos.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Email ou senha incorretos.' });
        }
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return done(null, false, { message: 'Usuário não encontrado' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;
