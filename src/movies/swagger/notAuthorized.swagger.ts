import { ApiProperty } from '@nestjs/swagger';

export class NotAuthorizedSwagger {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}
