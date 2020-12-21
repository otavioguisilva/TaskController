import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('foto', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, `${file.originalname}`);
                },
            }),
        }),
    )
    uploadSingle(@UploadedFile() file) {
        console.log(file);
    }
}
