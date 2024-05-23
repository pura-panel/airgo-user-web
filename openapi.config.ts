import { generateService } from '@umijs/openapi';

generateService({
  requestLibPath: "import request from '@/lib/request';",
  schemaPath: 'https://xxxu.xyz/api/swagger/doc.json',
  // schemaPath: join(__dirname, 'openapi.json'),
  // projectName: 'api',
  serversPath: './src/service',
});
