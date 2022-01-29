import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';
const JWT_SECRET_KEY = <string>process.env.JWT_SECRET_KEY;
// const { AUTH_MODE } =  process.env.AUTH_MODE === 'true';

export { PORT, HOST, JWT_SECRET_KEY };
