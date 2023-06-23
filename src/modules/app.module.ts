import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, DbService, AuthService], 
})
export class AppModule {}