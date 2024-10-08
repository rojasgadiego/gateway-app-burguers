import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { CreateLineaProductoInput } from '../dto/create-lineaproducto';
import { firstValueFrom } from 'rxjs';
import {
  LINEAPRODUCTO_SERVICE_NAME,
  LineaproductoServiceClient,
} from '../types/lineaproducto.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class LineaproductoService {
  private svc: LineaproductoServiceClient;

  @Inject(LINEAPRODUCTO_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService(LINEAPRODUCTO_SERVICE_NAME);
  }

  async createLineaProducto(createLineaProducto: CreateLineaProductoInput) {
    const response = await firstValueFrom(
      this.svc.createLineaproducto(createLineaProducto),
    );
    if (response.status >= HttpStatus.NOT_FOUND) {
      return {
        status: response.status,
        error: response.error[0],
        message: 'not created',
      };
    }
    return {
      status: response.status,
      error: '',
      message: 'Lineaproducto Creada',
    };
  }

  async getProductosByIdCarrito(data) {
    const response = await firstValueFrom(
      this.svc.getProductosByIdCarrito(data),
    );

    if (response.status >= HttpStatus.NOT_FOUND) {
      return {
        productos: [],
        error: response.error[0],
        status: response.status,
      };
    }
    return {
      productos: response.productos,
      error: '',
      status: response.status,
    };
  }

  async vaciarCarrito(getProductoByIdCarritoInput) {
    const response = await firstValueFrom(
      this.svc.vaciarCarrito(getProductoByIdCarritoInput),
    );
    if (response.status >= HttpStatus.NOT_FOUND) {
      return {
        Empty: response.deleted,
        error: response.error[0],
        status: response.status,
      };
    }
    return {
      Empty: response.deleted,
      error: '',
      status: HttpStatus.OK,
    };
  }

  async getLineaProductosByIdCarrito(data) {
    const response = await firstValueFrom(
      this.svc.getLineaProductoByIdCarrito(data),
    );

    if (response.status >= HttpStatus.NOT_FOUND) {
      return {
        lp: [],
        error: response.error[0],
        status: response.status,
      };
    }
    return {
      lp: response.lp,
      error: '',
      status: response.status,
    };
  }

  async deleteLineaProducto(data) {
    const response = await firstValueFrom(
      this.svc.deleteLineaProductoById(data),
    );
    if (response.status >= HttpStatus.NOT_FOUND) {
      return {
        deleted: false,
        error: response.error[0],
        status: response.status,
      };
    }
    return {
      deleted: true,
      error: '',
      status: response.status,
    };
  }

  async updateLineaProducto(data) {
    const response = await firstValueFrom(
      this.svc.updateLineaProductoById(data),
    );
    if (response.status >= HttpStatus.NOT_FOUND) {
      return {
        update: false,
        error: response.error[0],
        status: response.status,
      };
    }
    return {
      update: true,
      error: '',
      status: response.status,
    };
  }
}
