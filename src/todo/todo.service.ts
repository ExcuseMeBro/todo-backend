import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    if (createTodoDto.title == null || createTodoDto.title == '') {
      throw new BadRequestException('title is required');
    } else {
      this.todoRepository
        .save(createTodoDto)
        .then((r) => {
          return r;
        })
        .catch((err) => {
          throw new BadRequestException(err).getResponse();
        });
    }
  }

  async findAll() {
    try {
      return await this.todoRepository.find({});
    } catch (err) {
      throw new BadRequestException(err).getResponse();
    }
  }

  async findOne(id: number) {
    return await this.todoRepository
      .findOne({
        where: { id },
      })
      .then((r) => {
        if (r) {
          return r;
        }
        throw new BadRequestException('todo not found').getResponse();
      })
      .catch((err) => {
        throw new BadRequestException(err).getResponse();
      });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    if (updateTodoDto.title == null || updateTodoDto.title == '') {
      throw new BadRequestException('title is required');
    } else if (!id) {
      throw new BadRequestException('todo id is required');
    } else {
      return await this.todoRepository
        .update(id, {
          ...updateTodoDto,
          updated_at: new Date(),
        })
        .then(() => {
          return this.findOne(id);
        })
        .catch((err) => {
          throw new BadRequestException(err).getResponse();
        });
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('todo id is required');
    } else {
      return this.findOne(id).then(async () => {
        return await this.todoRepository
          .delete(id)
          .then(() => {
            return true;
          })
          .catch((err) => {
            throw new BadRequestException(err).getResponse();
          });
      });
    }
  }
}
