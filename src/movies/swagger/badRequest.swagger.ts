import { ApiProperty } from '@nestjs/swagger';

export class BadRequestOrNofFoundSwagger {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;
}
