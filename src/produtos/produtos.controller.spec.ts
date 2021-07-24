import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

const produtoList: Produto[] = [
  new Produto(),
  new Produto(),
]

const produto = new Produto();

describe('ProdutosController', () => {
  let controller: ProdutosController;
  let service: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [
        {
          provide: ProdutosService,
          useValue: {
            create: jest.fn().mockResolvedValue(produto),
            findAll: jest.fn().mockResolvedValue(produtoList),
            findOne: jest.fn().mockResolvedValue(produtoList[0]),
            update: jest.fn().mockResolvedValue(produto),
            remove: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
    service = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(produtoList);
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
      const body: CreateProdutoDto = {
        codigo: "123",
        nome: "teste",
        cor: "verde",
        tamanho: "P",
        valor: 1.00
      };

      const result = await controller.create(body);

      expect(result).toEqual(produto);
    });
    it('should throw an expection', () => {
      const body: CreateProdutoDto = {
        codigo: "123",
        nome: "teste",
        cor: "verde",
        tamanho: "P",
        valor: 1.00
      };
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should find a record', async () => {

      const result = await controller.findOne(1);

      expect(result).toEqual(produtoList[0]);
    });
    it('should throw an expection', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a record', async () => {
      const body: UpdateProdutoDto = {
        codigo: "1234"
      };

      const result = await controller.update(1, body);

      expect(result).toEqual(produto);
    });
    it('should throw an expection', () => {
      const body: UpdateProdutoDto = {
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
