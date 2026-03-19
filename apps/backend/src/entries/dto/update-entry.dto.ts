import { CreateEntryDto } from "./create-entry.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdateEntryDto extends PartialType(CreateEntryDto) {}