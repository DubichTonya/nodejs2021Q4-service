import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

const PORT = process.env.PORT || 4000;
// const { NODE_ENV } = process.env.NODE_ENV;
// const { MONGO_CONNECTION_STRING } = process.env.MONGO_CONNECTION_STRING;
// const { JWT_SECRET_KEY } = process.env.JWT_SECRET_KEY;
// const { AUTH_MODE } =  process.env.AUTH_MODE === 'true';

export {
    PORT
};
