import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../../../../src/infrastructure/services/bcrypt/bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  const passwordWithoutHash = 'passwordFake1234';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('Should hash a password correctly', async () => {
    const passwordHashed = await service.hash(passwordWithoutHash);

    expect(await service.compare(passwordWithoutHash, passwordHashed)).toBe(
      true,
    );
  });
});
