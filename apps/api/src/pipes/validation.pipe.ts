// import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';
// import { ValidationException } from '../exceptions/validation.exception';

// @Injectable()
// export class ValidationPipe implements PipeTransform {
//   async transform(value: any, metadata: ArgumentMetadata): Promise<any> {

//     const obj = plainToClass(metadata.metatype, value);
//     const errors = await validate(obj);
//     if (errors.length) {
//       // console.log(errors);
//       let messages = errors.map((err) => {
//         return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
//       });
//       throw new ValidationException(messages);
//     }
//     return value;
//   }
// }
import { ArgumentMetadata, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
    // 1. Проверяем, нужно ли валидировать (пропускаем, если нет метатипа или это простой тип)
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // 2. Преобразуем plain object в экземпляр класса (используем современный plainToInstance)
    const obj = plainToInstance(metatype, value) as object;

    // 3. Выполняем валидацию
    const errors: ValidationError[] = await validate(obj);

    if (errors.length > 0) {
      // 4. Собираем сообщения (включая вложенные ошибки)
      const messages = this.flattenErrors(errors);
      throw new ValidationException(messages);
    }

    // 5. Возвращаем трансформированный объект, чтобы работали @Type и @Transform
    return obj;
  }

  private toValidate(metatype: Type<unknown>): boolean {
    const types: Array<Type<unknown>> = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private flattenErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        messages.push(`${error.property} - ${Object.values(error.constraints).join(', ')}`);
      }
      // Рекурсивно собираем ошибки из вложенных объектов (например, из filter)
      if (error.children && error.children.length > 0) {
        messages.push(...this.flattenErrors(error.children));
      }
    }

    return messages;
  }
}
