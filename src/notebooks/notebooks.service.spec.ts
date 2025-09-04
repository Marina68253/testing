import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { title } from 'process';
import { Controller } from '@nestjs/common';


const mockaRepo= {create:jest.fn(),find:jest.fn(),save:jest.fn()}


describe('NotebooksService', () => {
  let service: NotebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotebooksService, {provide:getRepositoryToken(Notebook),useValue:mockaRepo}],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
  });
describe('create',()=>{
  it('deberia crear notebook', async()=>{
    const dto={title:'notebok1',content:'contenido'}
    const result={id:1,...dto}
    mockaRepo.create.mockReturnValue(result)
    mockaRepo.save.mockResolvedValue(result)
    const res=await service.create(dto)
    expect(mockaRepo.create).toHaveBeenCalledWith(dto)
    expect(res).toEqual(result)
    
  })
})
describe('findAll', ()=>{
  it('deberia buscar todos los notebooks',async()=>{
    const resultEsperado=[{id:1,title:'notebook1',content:'contenido '},{id:2,title:'notebook1',content:'contenido '}]
    mockaRepo.find.mockResolvedValue(resultEsperado)
    const result=await service.findAll()
    expect(mockaRepo.find).toHaveBeenCalled()
    expect(result).toEqual(resultEsperado)
  
  })

})
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
