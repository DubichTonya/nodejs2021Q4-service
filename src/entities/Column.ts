import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from './Board';
import { TaskEntity } from './Task';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  title: string;

  @Column()
  order: number;
  
  @ManyToOne(() => BoardEntity, boardEntity => boardEntity.columns, {onDelete: 'CASCADE'})
  board: BoardEntity;

  @OneToMany(() => TaskEntity, taskEntity => taskEntity.column)
  tasks: TaskEntity[];
}
