import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import {Response} from 'express'
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('fotos')
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
    create(@Res({passthrough: true}) res: Response ) {
        res.status(999)
    }
    uploadSingle(@UploadedFile() file) {
        console.log(file);
    }
}
