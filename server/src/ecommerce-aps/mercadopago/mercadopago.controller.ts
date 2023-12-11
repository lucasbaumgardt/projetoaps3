import { Controller, Get, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Get()
  getHello(): string {
    return 'Servidor Funcionando! :)';
  }

  @Post('/create_preference')
  createPreference(@Body() item: any): Promise<any> {
    return this.mercadoPagoService.createPreference(item);
  }
}
