import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateEntryDto {
  @IsDateString()
  date: string;

  @IsInt()
  workTypeId: number

  @IsNumber()
  @Min(0.01 )
  volume: number;

  @IsNotEmpty()
  @IsString()
  executorName: string;

  @IsOptional()
  @IsString()
  notes?: string;
}