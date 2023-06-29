import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMain(): any {
    return {
      name: 'shop-api',
      version: '0.0.1',
    };
  }
}
