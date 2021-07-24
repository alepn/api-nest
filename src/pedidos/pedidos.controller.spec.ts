import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

const pedidoList: Pedido[] = [
  new Pedido(),
  new Pedido(),
]

const pedido = new Pedido();

describe('PedidosController', () => {
  let controller: PedidosController;
  let service: PedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [
        {
          provide: PedidosService,
          useValue: {
            create: jest.fn().mockResolvedValue(pedido),
            findAll: jest.fn().mockResolvedValue(pedidoList),
            findOne: jest.fn().mockResolvedValue(pedidoList[0]),
            update: jest.fn().mockResolvedValue(pedido),
            remove: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(pedidoList);
      expect(typeof result).toEqual('object');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
    it('should throw an expection', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(controller.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a record', async () => {
      const body: CreatePedidoDto = {
        "codigo": "1234",
        "observacao": "obs",
        "formaPagamento": "dinheiro",
        "cliente": 1,
        "itensPedido": [
          {
            "produto": 1,
            "quantidade": 1.0000
          }
        ]
      };

      const result = await controller.create(body);

      expect(result).toEqual(pedido);
    });
    it('should throw an expection', () => {
      const body: CreatePedidoDto = {
        "codigo": "1234",
        "observacao": "obs",
        "formaPagamento": "dinheiro",
        "cliente": 1,
        "itensPedido": [
          {
            "produto": 1,
            "quantidade": 1.0000
          }
        ]
      };
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should find a record', async () => {

      const result = await controller.findOne(1);

      expect(result).toEqual(pedidoList[0]);
    });
    it('should throw an expection', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a record', async () => {
      const body: UpdatePedidoDto = {
        codigo: "1234"
      };

      const result = await controller.update(1, body);

      expect(result).toEqual(pedido);
    });
    it('should throw an expection', () => {
      const body: UpdatePedidoDto = {
        codigo: "1234",
      };
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      expect(controller.update(1, body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should delete a record', async () => {
      const result = await controller.remove(1);

      expect(result).toBeUndefined();
    });
    it('should throw an expection', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove(1)).rejects.toThrowError();
    });
  });
});
