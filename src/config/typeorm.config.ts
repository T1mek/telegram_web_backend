import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from '../product/product.entity';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'localhost',
  port: configService.get('PORT'),
  database: configService.get('DATABASE'),
  username: configService.get('USERNAME'),
  password: configService.get('PASSWORD'),
  autoLoadEntities: true,
  entities: [Product],
  synchronize: true,
});
