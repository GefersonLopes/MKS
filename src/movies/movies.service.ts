import {
    Injectable,
    Inject,
    CACHE_MANAGER,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
        @Inject(CACHE_MANAGER) private readonly cacheManeger: Cache
    ) {}
    async create(createMovieDto: CreateMovieDto) {
        const validatedMovie = ['', undefined, false, null];
        const nameExist = validatedMovie.includes(createMovieDto.name);
        const descriptionExist = validatedMovie.includes(
            createMovieDto.description
        );
        if (nameExist || descriptionExist) {
            throw new BadRequestException('Name and description is required');
        }
        await this.cacheManeger.set(
            createMovieDto.name,
            JSON.stringify(createMovieDto)
        );

        const verifyExistMovie = await this.moviesRepository.findOne({
            name: createMovieDto.name,
        });
        if (verifyExistMovie) {
            throw new BadRequestException('Movie already exists');
        }

        const movie = this.moviesRepository.save(createMovieDto);
        return movie;
    }

    async findAll() {
        return await this.moviesRepository.find();
    }

    async findOne(id: number) {
        const movie = await this.moviesRepository.findOne({
            where: { id: id },
        });

        const movieRedis = await this.cacheManeger.get(movie.name);
        if (movieRedis) {
            return movieRedis;
        }
        await this.cacheManeger.set(movie.name, JSON.stringify(movie));

        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        return movie;
    }

    async update(id: number, updateMovieDto: UpdateMovieDto) {
        const movie = await this.moviesRepository.findOne({ where: { id } });
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        movie.name = updateMovieDto.name;
        movie.description = updateMovieDto.description;

        await this.moviesRepository.save(movie);
        return movie;
    }

    async remove(id: number) {
        const movie = await this.moviesRepository.findOne({ where: { id } });
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        this.moviesRepository.delete(id);
    }
}
