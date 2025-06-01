import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assignment } from './entities/assignment.entities';
import {
  IAssignmentDocument,
  IAssignmentModel,
} from './interfaces/assignment.interface';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
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

  async deleteAssignment(id: string): Promise<IAssignmentDocument | null> {
    try {
      if (!id) {
        throw new Error('An id is required to delete an assignment');
      }
      const removedAssignment =
        await this.assignmentModel.findByIdAndDelete(id);
      if (!removedAssignment) {
        throw new Error('Error assignment does not exists:');
      }
      return removedAssignment;
    } catch (error) {
      throw new Error(
        `Failed to delete an assignment: ${(error as Error).message}`,
      );
    }
  }

  async updateAssignment(
    id: string,
    updateAssignment: UpdateAssignmentDto,
  ): Promise<IAssignmentDocument | null> {
    try {
      if (!id) {
        throw new Error('An id is required to update single assignment');
      }
      const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
        id,

        updateAssignment,

        { new: true },
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
