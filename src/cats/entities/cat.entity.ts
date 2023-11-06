import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class Cat {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
