import { Module } from '@nestjs/common';
import { CollaborationGateway } from './collaboration.gateway';
import { CodeExecutionModule } from "./code-execution/code-execution.module";
@Module({
  providers: [CollaborationGateway],
  imports: [CodeExecutionModule],
})
export class AppModule {}
