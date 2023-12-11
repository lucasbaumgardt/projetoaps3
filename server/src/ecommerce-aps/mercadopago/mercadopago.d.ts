declare module 'mercadopago' {
    interface Item {
      title: string;
      unit_price: number;
      quantity: number;
    }
  
    interface BackUrls {
      success: string;
      failure: string;
      pending: string;
    }
  
    interface Preference {
      items: Item[];
      back_urls: BackUrls;
      auto_return: string;
    }
  
    interface MercadoPagoStatic {
      configure(config: { access_token: string }): void;
      preferences: {
        create(preference: Preference): Promise<any>;
      };
    }
  
    const mercadopago: MercadoPagoStatic;
  
    export = mercadopago;
  }
  