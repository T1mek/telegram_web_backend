import {
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional({ each: true })
  images?: string[];

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  popularity: number;
}
