import { Injectable } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './case.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly casesRepo: Repository<Case>,
  ) {}

  async create(createCaseDto: CreateCaseDto) {
    const newCase = this.casesRepo.create(createCaseDto);
    const saved = await this.casesRepo.save(newCase);
    console.log('saved', saved);
    return saved;
  }

  findAll() {
    return `This action returns all cases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  update(id: number, updateCaseDto: any) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
