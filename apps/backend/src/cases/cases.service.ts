import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './case.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly casesRepo: Repository<Case>
  ) {}

  async create(createCaseDto: CreateCaseDto) {
    const newCase = this.casesRepo.create(createCaseDto);
    const saved = await this.casesRepo.save(newCase);
    return saved;
  }

  async findAll() {
    // return await this.casesRepo.find();
    throw new Error('Not implemented');
  }

  async findOne(id: number) {
    const item = await this.casesRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Case not found');
    }
    return item;
  }

  async update(id: number, updateCaseDto: any) {
    await this.findOne(id);
    return await this.casesRepo.update(id, updateCaseDto);
  }

  remove(id: number) {
    return this.casesRepo.delete(id);
  }
}
