import { Body, Controller, Post } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';

@Controller('code')
export class CodeController {
  constructor() { }

  @Post('runtests')
  async runTests(@Body() body: { code: string }): Promise<any> {
    const { code } = body;

    // Guardar el código y los tests en archivos temporales
    const codeFileName = 'temp_code.py';
    const testsFileName = 'temp_tests.py';
    const testsContent = fs.readFileSync('src/tests-files/tests.py', 'utf8');
    fs.writeFileSync(codeFileName, code);
    fs.writeFileSync(
      testsFileName,
      `from ${codeFileName.replace('.py', '')} import *\n` + testsContent,
    );
    // Ejecutar los tests
    return new Promise<{ message: string }>((resolve, reject) => {
      exec(`python3 ${testsFileName}`, (error, stdout, stderr) => {
        if (error) {
          reject('Error al ejecutar los tests');
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        console.log(stdout); // Imprimir la respuesta en la consola del backend
        resolve({ message: stdout });
      });
    });
  }
}
