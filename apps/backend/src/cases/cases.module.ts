import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { AppConfigModule } from '../app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './case.entity';


@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forFeature([Case]),
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
