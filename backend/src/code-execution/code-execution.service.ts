import { Injectable, BadRequestException } from "@nestjs/common";
import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const execPromise = promisify(exec);
const TEMP_DIR = path.join(__dirname, "..", "temp");

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

@Injectable()
export class CodeExecutionService {
  async executeCode(language: string, code: string): Promise<string> {
    const fileMap: Record<string, { ext: string; command: string }> = {
      javascript: { ext: "js", command: "node" },
      python: { ext: "py", command: process.platform === "win32" ? "python" : "python3" },
      cpp: { ext: "cpp", command: "g++ \"{filePath}\" -o \"{TEMP_DIR}/code\" && \"{TEMP_DIR}/code\"" },
    };

    if (!fileMap[language]) {
      throw new BadRequestException("Unsupported language");
    }

    const { ext, command } = fileMap[language];
    const filePath = path.join(TEMP_DIR, `code.${ext}`);

    // Write code to a file
    fs.writeFileSync(filePath, code);

    try {
      // ✅ Wrap filePath in quotes to handle spaces
      const commandWithQuotes = `${command} "${filePath}"`;
      const { stdout, stderr } = await execPromise(commandWithQuotes);
      return stderr || stdout;
    } catch (error) {
      return error.stderr || "Execution error.";
    }
  }
}
