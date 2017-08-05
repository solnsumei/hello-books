import jwt from 'jsonwebtoken';

export function authMiddleware(app){
    return (req, res, next) =>{
        // check request for token
        const token = req.body.token || req.query.token || req.headers['x-token'];

        // if token not found return forbidden
        if(!token){
            return res.status(403).send({
                error: 'You are not allowed to access this page'
            });
        }

        // Verify token using jsonwebtokens
        jwt.verify(token, app.get('webSecret'), (err, decoded) => {
            if(err){
                return res.status(403).send({
                    error: 'token could not be authenticated'
                });
            }

            req.decoded = decoded;
            next();
        });
    }

}