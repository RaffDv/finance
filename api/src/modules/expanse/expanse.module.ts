import { Module } from '@nestjs/common';
import { ExpanseService } from './expanse.service';
import { ExpanseController } from './expanse.controller';

@Module({
  controllers: [ExpanseController],
  providers: [ExpanseService],
})
export class ExpanseModule {}
