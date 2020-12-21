import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('fotoPerfil')
export class FotoPerfilController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('foto', {
            dest: './uploads',
        }),
    )
    uploadSingle(@UploadedFile() file) {
        console.log(file);
    }
}
