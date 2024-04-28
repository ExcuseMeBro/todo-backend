import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({ minLength: 3, maxLength: 128, type: String })
  title: string;

  @ApiProperty({ minLength: 3, maxLength: 1000, type: String, required: false })
  description: string;

  @ApiProperty({ required: false, default: false, type: Boolean })
  completed: boolean;
}
