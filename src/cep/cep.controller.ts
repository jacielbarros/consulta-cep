import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { CepService } from './cep.service';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  async getEndereco(@Param('cep') cep: string) {
    try {
      return await this.cepService.consultaCep(cep);
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
