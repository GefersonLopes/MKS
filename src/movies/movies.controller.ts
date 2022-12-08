import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MoviesSwagger } from './swagger/movies.swaggers';
import { BadRequestOrNofFoundSwagger } from './swagger/badRequest.swagger';
import { NotAuthorizedSwagger } from './swagger/notAuthorized.swagger';

@Controller('movies')
@ApiTags('movies')
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Post()
    @ApiOperation({ summary: 'create movie' })
    @ApiResponse({
        status: 200,
        description: ' create movie',
        type: MoviesSwagger,
    })
    @ApiResponse({
        status: 401,
        description: 'not authorized',
        type: NotAuthorizedSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Movie already exists',
        type: BadRequestOrNofFoundSwagger,
    })
    public create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    @ApiOperation({ summary: 'find all movies' })
    @ApiResponse({
        status: 200,
        description: 'find all movie',
        type: MoviesSwagger,
        isArray: true,
    })
    @ApiResponse({
        status: 401,
        description: 'not authorized',
        type: NotAuthorizedSwagger,
    })
    public findAll() {
        return this.moviesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'get by id movie' })
    @ApiResponse({
        status: 200,
        description: 'get by id movie',
        type: MoviesSwagger,
        isArray: true,
    })
    @ApiResponse({
        status: 401,
        description: 'not authorized',
        type: NotAuthorizedSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Movie not found',
        type: BadRequestOrNofFoundSwagger,
    })
    public findOne(@Param('id') id: string) {
        return this.moviesService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'update movie' })
    @ApiResponse({
        status: 200,
        description: 'update movie movie',
        type: MoviesSwagger,
    })
    @ApiResponse({
        status: 401,
        description: 'not authorized',
        type: NotAuthorizedSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Movie not found',
        type: BadRequestOrNofFoundSwagger,
    })
    public update(
        @Param('id') id: string,
        @Body() updateMovieDto: UpdateMovieDto
    ) {
        return this.moviesService.update(+id, updateMovieDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete movie' })
    @ApiResponse({ status: 200, description: 'movie' })
    @ApiResponse({
        status: 401,
        description: 'not authorized',
        type: NotAuthorizedSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Movie not found',
        type: BadRequestOrNofFoundSwagger,
    })
    remove(@Param('id') id: string) {
        return this.moviesService.remove(+id);
    }
}
