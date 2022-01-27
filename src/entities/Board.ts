import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './Task';
import { IColumn } from '../resources/boards/board.service';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  
  @Column("jsonb")
  columns!: IColumn[];

  @OneToMany(() => TaskEntity, taskEntity => taskEntity.board)
  tasks: TaskEntity[];
}
