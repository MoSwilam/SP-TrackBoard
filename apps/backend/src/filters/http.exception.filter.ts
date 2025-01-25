import { BadRequestException, Catch, HttpStatus } from '@nestjs/common';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message || 'Internal server error',
      error: exception.name || 'Unknown backend Error',
      path: request.url,
    });

    // Log the error for debugging purposes
    console.error('====================');
    console.error('General Error:', exception.message);
    console.error('====================');
  }
}
