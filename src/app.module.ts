import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [UserModule, AuthModule, forwardRef(() => CategoryModule), forwardRef(() => NewsModule )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

