import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  constructor() {
    mercadopago.configure({
      access_token: 'TEST-2580660087845142-100714-ffb5304be07d82491a4454d388f46deb-202318691',
    });
  }

  async createPreference(item: any) {
    const preference = {
      items: [
        {
          title: item.description,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
        },
      ],
      back_urls: {
        success: 'http://localhost:3000',
        failure: 'http://localhost:3000',
        pending: '',
      },
      auto_return: 'approved',
    };
  
    console.log("Preference being sent to MercadoPago:", preference);
  
    try {
      const response = await mercadopago.preferences.create(preference);
      console.log("Response from MercadoPago:", response);
      return response;
    } catch (error) {
      console.error("Error from MercadoPago:", error);
      throw error;
    }
  }
  
}
