import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
        const validatedMovie = ['', undefined, false, null];

        const nameNotExist = validatedMovie.includes(createUserDto.name);
        const ageVerify = createUserDto.age < 18;
        const emailNotExist = validatedMovie.includes(createUserDto.email);
        const passwordNotExist = validatedMovie.includes(
            createUserDto.password
        );

        if (nameNotExist || passwordNotExist) {
            throw new BadRequestException(
                'data needs to be passed and correctly'
            );
        }
        if (emailNotExist) {
            throw new BadRequestException('email already exists');
        }
        if (ageVerify) {
            throw new BadRequestException('age need to be 18 or +');
        }

        const verifyExistUser = await this.usersRepository.findOne({
            email: createUserDto.email,
        });
        if (verifyExistUser) {
            throw new BadRequestException('User already exists');
        }

        const hash = await bcrypt.hashSync(createUserDto.password, 10);
        createUserDto.password = hash;

        const user = new User();
        user.name = createUserDto.name;
        user.age = createUserDto.age;
        user.email = createUserDto.email;
        user.password = hash;
        await this.usersRepository.save(user);
        user.password = undefined;
        return user;
    }
}
