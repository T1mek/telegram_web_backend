import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Base } from '../utils/base';

@Entity()
export class Product extends Base {
  @Column()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Column('simple-array', { nullable: true, default: [] })
  @IsString()
  @IsOptional()
  images?: string[];

  @Column()
  @IsNumber()
  @Min(0)
  price: number;

  @Column()
  @IsNumber()
  @Min(0)
  quantity: number;

  @Column()
  @IsNumber()
  @Min(0)
  popularity: number;
}
