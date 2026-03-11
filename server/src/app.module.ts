import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CollectionsModule } from './collections/collections.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CollectionsModule],
})
export class AppModule {}
