import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ObservacaoTar from 'src/db/entity/observacaotar.entity';
import ObservacaoTarInput from 'src/resolvers/input/observacaotar.input';
import RepoService from 'src/repo.service';
import { Like } from 'typeorm';

@Resolver()
class ObservacaoTarResolver {
    constructor(private readonly repoService: RepoService) {}
}

export default ObservacaoTarResolver;
