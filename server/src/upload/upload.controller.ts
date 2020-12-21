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
                    const dirName = file.originalname;
                    const originalDir = `../web/public/fotos/perfil/`;
                    console.log(dirName);
                    cb(null, originalDir + dirName);
                },
                filename: (req, file, cb) => {
                    const extensao = file.mimetype.substr(6);
                    cb(null, `${file.originalname}.${extensao}`);
                },
            }),
        }),
    )
    uploadSingle(@UploadedFile() file) {
        console.log(file);
    }
}
