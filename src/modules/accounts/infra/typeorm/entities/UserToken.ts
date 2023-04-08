import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';

@Entity('user_tokens')
class UserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column()
  expires_date: Date;

  @Column()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { UserToken };
