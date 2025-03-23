import { Module } from "@nestjs/common";
import { CodeExecutionService } from "./code-execution.service";
import { CodeExecutionController } from "./code-execution.controller";

@Module({
  controllers: [CodeExecutionController],
  providers: [CodeExecutionService],
})
export class CodeExecutionModule {}
