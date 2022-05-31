import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/stats/circulatingVolt (GET)', () => {
    return request(app.getHttpServer())
      .get('/stats/circulatingVolt')
      .expect(200)
      .expect(({ body }) => {
        return Number(body) > 0;
      });
  });
  it('/stats/totalSupplyVolt (GET)', () => {
    return request(app.getHttpServer())
      .get('/stats/totalSupplyVolt')
      .expect(200)
      .expect(({ body }) => {
        return Number(body) > 0;
      });
  });
});
