import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity } from './Column';
import { TaskEntity } from './Task';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, columnEntity => columnEntity.board)
  columns: ColumnEntity[];

  @OneToMany(() => TaskEntity, taskEntity => taskEntity.board)
  tasks: TaskEntity[];
}
