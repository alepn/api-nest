import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

const clienteList: Cliente[] = [
  new Cliente(),
  new Cliente(),
]

const cliente = new Cliente();

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesService,
          useValue: {
            create: jest.fn().mockResolvedValue(cliente),
            findAll: jest.fn().mockResolvedValue(clienteList),
            findOne: jest.fn().mockResolvedValue(clienteList[0]),
            update: jest.fn().mockResolvedValue(cliente),
            remove: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(clienteList);
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
      const body: CreateClienteDto = {
        codigo: "123",
        nome: "teste",
        cpf: "123",
        sexo: "M",
        email: "teste@teste.com"
      };

      const result = await controller.create(body);

      expect(result).toEqual(cliente);
    });
    it('should throw an expection', () => {
      const body: CreateClienteDto = {
        codigo: "123",
        nome: "teste",
        cpf: "123",
        sexo: "M",
        email: "teste@teste.com"
      };
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should find a record', async () => {

      const result = await controller.findOne('123');

      expect(result).toEqual(clienteList[0]);
    });
    it('should throw an expection', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne('123')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a record', async () => {
      const body: UpdateClienteDto = {
        codigo: "1234"
      };

      const result = await controller.update(1, body);

      expect(result).toEqual(cliente);
    });
    it('should throw an expection', () => {
      const body: UpdateClienteDto = {
        codigo: "1234",
      };
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      expect(controller.update(1, body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should delete a record', async () => {
      const result = await controller.remove('123');

      expect(result).toBeUndefined();
    });
    it('should throw an expection', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove('123')).rejects.toThrowError();
    });
  });
});
