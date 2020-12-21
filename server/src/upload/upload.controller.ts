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
                    cb(null, originalDir + dirName);
                },
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    cb(null, `${randomName}${file.originalname}.jpg`);
                },
            }),
        }),
    )
    uploadSingle(@UploadedFile() file) {
        console.log(file);
    }
}
