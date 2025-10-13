function checkAdmin(req, res, next) { // Middleware to check if user is admin
    if (req.user.isAdmin === true || req.user.isHost === true) {
        return next();
    }
    res.status(403).json({ error: 'User is not ADMIN' });
}

function checkHost(req, res, next) { // Middleware to check if user is host
    if (req.user.isHost === true) {
        return next();
    }
    res.status(403).json({ error: 'User is not HOST' });
}

module.exports = { checkAdmin, checkHost };