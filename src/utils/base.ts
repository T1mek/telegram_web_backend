import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();
const id = parseInt(uuid.replace(/-/g, ''), 16);
export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  addId() {
    this.id = id;
  }
}
