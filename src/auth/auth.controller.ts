import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersSwagger } from '../users/swagger/users.swaggers';
import { BadRequestOrNofFoundSwagger } from '../movies/swagger/badRequest.swagger';

@Controller('users/login')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'login user' })
    @ApiResponse({
        status: 200,
        description: ' login user',
        type: UsersSwagger,
    })
    @ApiResponse({
        status: 404,
        description: ' Not Found user',
        type: BadRequestOrNofFoundSwagger,
    })
    @UseGuards(AuthGuard('local'))
    async login(@Body() createAuthDto: CreateAuthDto) {
        const { email, password } = createAuthDto;
        const user = await this.authService.validateUser(email, password);
        if (user) {
            return await this.authService.createToken(user);
        }
    }
}
