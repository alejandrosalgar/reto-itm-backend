// ----------------------- NestJs -----------------------
import { Module } from '@nestjs/common';
// ----------------------- Services -----------------------
import { ClientService } from './services/client.service';
// ----------------------- Controllers -----------------------
import { ClientController } from './controllers/client.controller';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
