import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CepService {
  async consultaCep(cep: string) {
    // Verificação de CEP com 8 dígitos
    if (cep.length !== 8 || isNaN(Number(cep))) {
      throw new HttpException('Número de CEP inválido.', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      // Verifica se o campo "erro" está presente na resposta da API ViaCEP
      if (data.erro) {
        throw new HttpException('CEP não localizado. Verifique e tente novamente.', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      // Tratamento para outros erros, caso não seja relacionado ao CEP não encontrado
      throw new HttpException(
        'CEP não localizado. Verifique e tente novamente.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
