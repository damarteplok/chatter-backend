import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.enitity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Message extends AbstractEntity {
  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field(() => User)
  user: User;

  @Field()
  chatId: string;
}
