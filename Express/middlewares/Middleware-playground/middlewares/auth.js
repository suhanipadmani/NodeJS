export const authorize = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || token !== 'abc12345') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}