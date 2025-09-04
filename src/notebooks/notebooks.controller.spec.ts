import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { title } from 'process';
import { error } from 'console';
import { Controller } from '@nestjs/common';

const mockaRepo = {create: jest.fn(),findAll: jest.fn()};

describe('NotebooksController', () => {
  let controller: NotebooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [NotebooksService, {provide:NotebooksService,useValue:mockaRepo}],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
  });

  beforeAll(()=>{
    jest.clearAllMocks()
  })
  describe('create',()=>{
    it('deberia crear notebook', async()=>{
      const dto={title:'notebok1',content:'contenido '}
      const result={id:1,...dto}
      mockaRepo.create.mockReturnValue(result)
      const res=await controller.create(dto)
      expect(mockaRepo.create).toHaveBeenCalledWith(dto)
      expect(res).toEqual(result)
      
    })
    it('deberia lanzar una excepcion si falla la creacion', async()=>{
      const dto={title:'notebook1',content:'contenido '}
      mockaRepo.create.mockRejectedValue(new Error('Error'));
    await expect(controller.create(dto)).rejects.toThrow('Error creating notebook');
  expect(mockaRepo.create).toHaveBeenCalledWith(dto)
    })
  })
  describe('findAll', ()=>{
    it('deberia bdevolver un arreglo de  notebooks',async()=>{
      const resultEsperado=[{id:1,title:'notebook1',content:'contenido '},{id:2,title:'notebook1',content:'contenido '}]
       mockaRepo.findAll.mockReturnValue(resultEsperado);
      const result=await controller.findAll()
      expect(result).toEqual(resultEsperado)
      expect(mockaRepo.findAll).toHaveBeenCalled()
    
    })
    it('deberia lanzar una excepcion si falla la busqueda', async()=>{
      mockaRepo.findAll.mockRejectedValue(new Error('Error '))
      await expect (controller.findAll()).rejects.toThrow('Error retrieving notebooks');
      expect(mockaRepo.findAll).toHaveBeenCalled()
      
    })
    })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
