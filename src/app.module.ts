import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from './modules/code/code.module';

@Module({
  imports: [CodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
