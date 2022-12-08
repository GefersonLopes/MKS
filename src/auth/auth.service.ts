import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}
    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({
            email: email,
        });
        if (!user) {
            return false;
        }
        const verifyPassword = await bcrypt.compareSync(
            password,
            user.password
        );
        if (!verifyPassword) {
            return false;
        }
        return user;
    }
    createToken(user: User) {
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
