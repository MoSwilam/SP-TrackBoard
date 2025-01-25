import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { AppConfigModule } from '../app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './case.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionsFilter } from '../filters/http.exception.filter';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Case])],
  controllers: [CasesController],
  providers: [
    CasesService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter
    }
  ],
})
export class CasesModule {}
