import { IsNotEmpty, IsString } from "class-validator";

export class CreateSessionDTO {
  @IsString()
  @IsNotEmpty()
  plateNumber: string;
  @IsString()
  @IsNotEmpty()
  slotId: string;
}
