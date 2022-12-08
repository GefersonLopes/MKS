import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column({ nullable: true })
    @ApiProperty()
    age: number;

    @Column({ unique: true })
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column({ default: true })
    @ApiProperty()
    isActive: boolean;

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date;
}
