"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoService = void 0;
const common_1 = require("@nestjs/common");
const mercadopago = require("mercadopago");
let MercadoPagoService = exports.MercadoPagoService = class MercadoPagoService {
    constructor() {
        mercadopago.configure({
            access_token: 'TEST-2580660087845142-100714-ffb5304be07d82491a4454d388f46deb-202318691',
        });
    }
    async createPreference(item) {
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
        }
        catch (error) {
            console.error("Error from MercadoPago:", error);
            throw error;
        }
    }
};
exports.MercadoPagoService = MercadoPagoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MercadoPagoService);
//# sourceMappingURL=mercadopago.service.js.map