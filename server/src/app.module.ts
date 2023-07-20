import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrainDataModule } from './brain_data/brain_data.module';


@Module({
  imports: [
    BrainDataModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
