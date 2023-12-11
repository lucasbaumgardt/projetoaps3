import { MercadoPagoService } from './mercadopago.service';
export declare class MercadoPagoController {
    private readonly mercadoPagoService;
    constructor(mercadoPagoService: MercadoPagoService);
    getHello(): string;
    createPreference(item: any): Promise<any>;
}
