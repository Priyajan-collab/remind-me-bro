import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IAssignmentDocument,
  IAssignmentModel,
} from './interfaces/assignment.interface';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { filter } from 'src/types/interface/filter.interface';
import { Assignment } from 'src/entities/assignment.entities';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private readonly assignmentModel: IAssignmentModel,
  ) {}

  async createAssignment(
    assignmentDto: CreateAssignmentDto,
  ): Promise<IAssignmentDocument> {
    try {
      const assignment = await this.assignmentModel.create(assignmentDto);

      return assignment;
    } catch (error) {
      throw new Error(
        `Failed to create assignment: ${(error as Error).message}`,
      );
    }
  }
  /**fetches all the assignments from the database
   * @returns  Promise resolving to array of assignment documents from database
   * @errors Throws an error if it fails to do so with message
   */
  async fetchAllAssignments(): Promise<IAssignmentDocument[]> {
    try {
      const assignments = await this.assignmentModel.find();
      return assignments;
    } catch (error) {
      throw new Error(
        `Failed to fetch assignments: ${(error as Error).message}`,
      );
    }
  }

  /**fetches a single assignment from the data base
   * @param id uses this id to find matching document in the database
   * @returns Promise resolving to single document from database
   */

  async fetchAssignment(id: string): Promise<IAssignmentDocument | null> {
    try {
      if (!id) {
        throw new Error('An id is required to fetch single assignment');
      }
      const assignment = await this.assignmentModel.findById(id);
      if (!assignment) {
        throw new Error('Assignment does not exists');
      }
      return assignment;
    } catch (error) {
      throw new Error(
        `Failed to fetch an assignment: ${(error as Error).message}`,
      );
    }
  }

  async deleteAssignment(
    subject: string,
    assignmentNumber: number,
  ): Promise<IAssignmentDocument | null> {
    try {
      console.log(subject, assignmentNumber);
      if (assignmentNumber === null || subject === null) {
        throw new Error('Invalid assignmentNumber or subject name');
      }
      const filter = { subject: subject, assignmentNumber: assignmentNumber };
      const options = {};
      const removedAssignment = await this.assignmentModel.findOneAndDelete(
        filter,
        options,
      );
      if (!removedAssignment) {
        throw new Error('Error assignment doeis not exists:');
      }
      return removedAssignment;
    } catch (error) {
      throw new Error(
        `Failed to delete an assignment: ${(error as Error).message}`,
      );
    }
  }

  async updateAssignment(
    filter: filter,
    updateAssignment: UpdateAssignmentDto,
  ): Promise<IAssignmentDocument | null> {
    try {
      const updatedAssignment = await this.assignmentModel.findOneAndUpdate(
        filter,
        updateAssignment,
      );
      if (!updatedAssignment) {
        throw new Error('Assignment does not exist');
      }
      return updatedAssignment;
    } catch (error) {
      throw new Error(
        `Failed to update assignment: ${(error as Error).message}`,
      );
    }
  }
}
