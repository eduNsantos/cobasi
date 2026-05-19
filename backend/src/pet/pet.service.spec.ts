import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

describe('PetService', () => {
  let service: PetService;
  let mockPetModel: any;

  const mockPet = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Rex',
    age: 5,
    breed: 'Labrador',
    ownerId: '507f1f77bcf86cd799439012',
  };

  beforeEach(async () => {
    const saveMethod = jest.fn().mockResolvedValue(mockPet);
    const instanceMock = { save: saveMethod };

    mockPetModel = jest.fn().mockImplementation(() => instanceMock);
    mockPetModel.find = jest.fn();
    mockPetModel.findById = jest.fn();
    mockPetModel.findByIdAndUpdate = jest.fn();
    mockPetModel.findByIdAndDelete = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: getModelToken(Pet.name),
          useValue: mockPetModel,
        },
      ],
    }).compile();

    service = module.get<PetService>(PetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pet', async () => {
      const createPetDto: CreatePetDto = new CreatePetDto(
        mockPet.name,
        mockPet.age,
        mockPet.breed,
        mockPet.ownerId
      );

      const result = await service.create(createPetDto);

      expect(result).toEqual(mockPet);
      expect(mockPetModel).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all pets', async () => {
      const mockPets = [mockPet];
      mockPetModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPets) });

      const result = await service.findAll();

      expect(result).toEqual(mockPets);
      expect(mockPetModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single pet by id', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockPetModel.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPet) });

      const result = await service.findOne(id);

      expect(result).toEqual(mockPet);
      expect(mockPetModel.findById).toHaveBeenCalledWith(id);
    });

    it('should return null if pet not found', async () => {
      const id = '000000000000000000000000';
      mockPetModel.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      const result = await service.findOne(id);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a pet', async () => {
      const id = '507f1f77bcf86cd799439011';
      const updatePetDto: UpdatePetDto = { name: 'Rex Updated' };
      const updatedPet = { ...mockPet, ...updatePetDto };

      mockPetModel.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(updatedPet) });

      const result = await service.update(id, updatePetDto);

      expect(result).toEqual(updatedPet);
      expect(mockPetModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updatePetDto, { new: true });
    });
  });

  describe('remove', () => {
    it('should remove a pet', async () => {
      const id = '507f1f77bcf86cd799439011';
      mockPetModel.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPet) });

      const result = await service.remove(id);

      expect(result).toEqual(mockPet);
      expect(mockPetModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
