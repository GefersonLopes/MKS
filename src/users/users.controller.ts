import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersSwagger } from './swagger/users.swaggers';
import { BadRequestOrNofFoundSwagger } from '../movies/swagger/badRequest.swagger';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 200, description: ' register user', type: UsersSwagger })
@ApiResponse({
    status: 400,
    description: ' data incorrect of user or user already exists',
    type: BadRequestOrNofFoundSwagger,
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
