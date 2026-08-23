import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello World do backend NestJS!',
      ambiente: process.env.APP_ENV ?? 'não definido',
      hostname: process.env.HOSTNAME ?? 'desconhecido', // dentro do container, HOSTNAME = id do container
      timestamp: new Date().toISOString(),
    };
  }
}
