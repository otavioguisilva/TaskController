import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('foto', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const dirName = file.originalname.substring(32, file.originalname.length - 4);
                    const originalDir = `../web/public/fotos/perfil/`;
                    console.log(dirName);
                    cb(null, originalDir + dirName);
                },
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
