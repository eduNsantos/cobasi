import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

describe('OwnerService', () => {
  let service: OwnerService;
  let mockOwnerModel: any;

  const mockOwner = {
    _id: '507f1f77bcf86cd799439011',
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '11999999999',
  };

  beforeEach(async () => {
    const saveMethod = jest.fn().mockResolvedValue(mockOwner);
    const instanceMock = { save: saveMethod };

    mockOwnerModel = jest.fn().mockImplementation(() => instanceMock);
    mockOwnerModel.find = jest.fn();
    mockOwnerModel.findOne = jest.fn();
    mockOwnerModel.findById = jest.fn();
    mockOwnerModel.findByIdAndUpdate = jest.fn();
    mockOwnerModel.findByIdAndDelete = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerService,
        {
          provide: getModelToken(Owner.name),
          useValue: mockOwnerModel,
        },
      ],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new owner', async () => {
      const createOwnerDto: CreateOwnerDto = new CreateOwnerDto(
        'João Silva',
        'joao@example.com',
        '11999999999'
      );

      mockOwnerModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      const result = await service.create(createOwnerDto);

      expect(result).toEqual(mockOwner);
      expect(mockOwnerModel.findOne).toHaveBeenCalledWith({ email: createOwnerDto.email });
      expect(mockOwnerModel).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all owners', async () => {
      const mockOwners = [mockOwner];
      mockOwnerModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockOwners),
      });

      const result = await service.findAll();

      expect(result).toEqual(mockOwners);
      expect(mockOwnerModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single owner by id', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockOwnerModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockOwner),
      });

      const result = await service.findOne(id);

      expect(result).toEqual(mockOwner);
      expect(mockOwnerModel.findById).toHaveBeenCalledWith(id);
    });

    it('should return null if owner not found', async () => {
      const id = 'invalid-id';
      mockOwnerModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await service.findOne(id);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an owner', async () => {
      const id = '507f1f77bcf86cd799439011';
      const updateOwnerDto: UpdateOwnerDto = { name: 'João Atualizado' };
      const updatedOwner = { ...mockOwner, ...updateOwnerDto };

      mockOwnerModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedOwner),
      });

      const result = await service.update(id, updateOwnerDto);

      expect(result).toEqual(updatedOwner);
      expect(mockOwnerModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateOwnerDto, { new: true });
    });
  });

  describe('remove', () => {
    it('should remove an owner', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockOwnerModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockOwner),
      });

      const result = await service.remove(id);

      expect(result).toEqual(mockOwner);
      expect(mockOwnerModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
