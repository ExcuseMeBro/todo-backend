import { ApiProperty } from '@nestjs/swagger';
export class CreateTodoDto {
  @ApiProperty({ minLength: 3, maxLength: 128, type: String })
  title: string;

  @ApiProperty({ minLength: 3, maxLength: 1000, type: String, required: false })
  description: string;

  @ApiProperty({ required: false, default: false, type: Boolean })
  completed: boolean;
}
