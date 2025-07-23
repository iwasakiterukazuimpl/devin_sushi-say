const request = require('supertest');
const app = require('../server');

describe('POST /say', () => {
  test('通常の入力: "まぐろ"と入力すると同じ"まぐろ"が返ってくる', async () => {
    const response = await request(app)
      .post('/say')
      .send({ text: 'まぐろ' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ text: 'まぐろ' });
  });

  test('何も入力しない場合: 空文字を送信するとエラーが返ってくる', async () => {
    const response = await request(app)
      .post('/say')
      .send({ text: '' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('入力が必要です');
  });

  test('textという項目がない場合: textフィールドが含まれていないとエラーを返す', async () => {
    const response = await request(app)
      .post('/say')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('入力が必要です');
  });
});
