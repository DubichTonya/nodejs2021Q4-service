import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './Task';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('jsonb')
  columns!: { title: string; order: number }[];

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.board)
  tasks: TaskEntity[];
}
