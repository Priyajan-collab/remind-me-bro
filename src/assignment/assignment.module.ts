import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Assignment, assignmentSchema } from 'src/entities/assignment.entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.name, schema: assignmentSchema },
    ]),
  ],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
