import { Injectable } from '@nestjs/common';
import RepoService from './repo.service';

@Injectable()
export class AppService {
    constructor(private readonly repoService: RepoService) {}

    async getHello(): Promise<string> {
        const buscaresult = await this.repoService.tarefaRepo
            .createQueryBuilder('Tarefa')
            .select('TIME(ABS(tar_DtHrAbert-tar_dthrfecha))')
            .where(`tar_Codigo = 1`)
            .execute();
        const result: any = Object.values(buscaresult[0]);
        const split: any = result.toString().split(':', 2);
        const valorHora = split[0];
        const valorMinuto = split[1];
        return `Essa Tarefa durou ${valorHora} hora(s) e ${valorMinuto} minuto(s)`;
    }
}
