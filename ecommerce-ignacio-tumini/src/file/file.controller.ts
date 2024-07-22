import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ProductService } from '../products/product.service';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    //@Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}
  @Post('uploadImage/:id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Upload image',
    description:
      'Recibe por el body en formato file el archivo a subir y retorna el producto con la url de la imagen',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'string',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 50000000,
            message: 'El tamaño máximo es de 200KB',
          }),
          new FileTypeValidator({
            fileType: /.(jpg|jpeg|png|webp|gif)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.productService.getProductById(id);
    const image = await this.fileService.uploadImage(file);
    return await this.productService.updateProduct(id, {
      imgUrl: image.secure_url,
    });
  }
}
