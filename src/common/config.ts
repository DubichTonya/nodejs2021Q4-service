import * as dotenv from 'dotenv';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import jwt from 'jsonwebtoken';

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';
const JWT_SECRET_KEY = <string>process.env.JWT_SECRET_KEY;

const USE_FASTIFY = () => {
  if (process.env.USE_FASTIFY === 'true') {
    return new FastifyAdapter();
  }
};

export { PORT, HOST, JWT_SECRET_KEY, USE_FASTIFY };
