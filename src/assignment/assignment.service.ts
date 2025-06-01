import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assignment } from './entities/assignment.entities';
import { IAssignmentModel } from './interfaces/assignment.interface';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private readonly assignment: IAssignmentModel,
  ) {}

  //   async createAssignment(createAssignmentDto): Promise<void> {
  //     const assignment;
  //   }
}
