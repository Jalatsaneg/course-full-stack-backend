// ນຳເຂົ້າ Test ແລະ TestingModule ຈາກ @nestjs/testing
import { Test, TestingModule } from '@nestjs/testing';
// ນຳເຂົ້າ UsersController ຈາກໄຟລ໌ users.controller
import { UsersController } from './users.controller';

// ອະທິບາຍຊຸດການທົດສອບສຳລັບ UsersController
describe('UsersController', () => {
  // ປະກາດຕົວແປ controller ເພື່ອເກັບ instance ຂອງ UsersController
  let controller: UsersController;

  // ກຳນົດການກະທຳທີ່ຈະເຮັດກ່ອນແຕ່ລະການທົດສອບ
  beforeEach(async () => {
    // ສ້າງ TestingModule ສຳລັບການທົດສອບ
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    // ດຶງ instance ຂອງ UsersController ຈາກ module
    controller = module.get<UsersController>(UsersController);
  });

  // ທົດສອບວ່າ controller ຖືກສ້າງຂຶ້ນຢ່າງຖືກຕ້ອງ
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
