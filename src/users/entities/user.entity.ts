import { AbstractEntity } from '../../common/database/abstract.enitity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractEntity {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  imageUrl: string;
}
