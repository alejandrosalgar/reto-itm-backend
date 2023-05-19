// ----------------------- NestJs -----------------------
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
// ----------------------- Libraries -----------------------

export function BearerDocs(docs: Partial<OperationObject>, formData = false) {
  return applyDecorators(
    ApiOperation(docs),
    ApiBearerAuth(),
    formData
      ? ApiConsumes('multipart/form-data')
      : ApiConsumes('application/json'),
  );
}
