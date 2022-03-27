import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './User';
import { BoardEntity } from './Board';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  boardId: string;

  @Column({ nullable: true })
  columnId: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: UserEntity | undefined;

  @ManyToOne(() => BoardEntity, (boardEntity) => boardEntity.tasks, {
    onDelete: 'CASCADE',
  })
  board: BoardEntity | undefined;
}
