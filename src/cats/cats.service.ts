import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from '../breed/entities/breed.entity';
import { UserActiveIntreface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}
  async create(createCatDto: CreateCatDto, user: UserActiveIntreface) {
    const breed = await this.validateBreed(createCatDto.breed);
    return await this.catRepository.save({
      ...createCatDto,
      breed,
      user: { id: user.id },
    });
  }

  async findAll(user: UserActiveIntreface) {
    if (user.role === Role.ADMIN) {
      return this.catRepository.find();
    }
    return await this.catRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: UserActiveIntreface) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
    this.validateOwnership(cat, user);
    return cat;
  }

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActiveIntreface,
  ) {
    await this.findOne(id, user);
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed
        ? await this.validateBreed(updateCatDto.breed)
        : undefined,
      user: { id: user.id },
    });
  }

  async remove(id: number, user: UserActiveIntreface) {
    await this.findOne(id, user);
    return await this.catRepository.softDelete({ id });
  }

  private validateOwnership(cat: Cat, user: UserActiveIntreface) {
    if (user.role !== Role.ADMIN && cat.user.id !== user.id) {
      throw new UnauthorizedException();
    }
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });

    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }

    return breedEntity;
  }
}
