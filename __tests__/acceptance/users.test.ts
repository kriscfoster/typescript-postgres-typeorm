import { Server } from 'http';
import * as request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import app from '../../src/app';
import { port } from '../../src/config';

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  age: 20,
};

const testUser2 = {
  firstName: 'Mary',
  lastName: 'Doe',
  age: 22,
};

let connection: Connection;
let server: Server;

beforeEach(async() => {
  connection = await createConnection();
  await connection.synchronize(true);
  server = app.listen(port);
});

afterEach(async() => {
  connection.close();
  server.close();
});

it('should be no users initialy', async () => {
  const response = await request(app).get('/users');
  expect(response.statusCode).toBe(200);
  const { body } = response;
  expect(body.length).toBe(0);
});

it('should create a user', async () => {
  const response = await request(app).post('/users').send(testUser);
  expect(response.statusCode).toBe(200);
  const { body } = response;
  expect(body).toEqual({ ...testUser, id: 1 })
});

it('should not create user if first name is missing', async () => {
  const response = await request(app).post('/users').send({
    lastName: 'Doe',
    age: 20
  });
  expect(response.statusCode).toBe(500);
});

it('should retrieve user after creation', async () => {
  const creationResponse = await request(app).post('/users').send(testUser);
  const createdUser = creationResponse.body;
  const response = await request(app).get(`/users/${createdUser.id}`);
  expect(response.statusCode).toBe(200);
  const { body } = response;
  expect(body).toEqual(createdUser);
});

it('should retrieve all users after creating two', async () => {
  const creationResponse = await request(app).post('/users').send(testUser);
  const createdUser = creationResponse.body;
  const creationResponse2 = await request(app).post('/users').send(testUser2);
  const createdUser2 = creationResponse2.body;
  const response = await request(app).get('/users');
  expect(response.statusCode).toBe(200);
  const { body } = response;
  expect(body.length).toBe(2);
  expect(body[0]).toEqual(createdUser);
  expect(body[1]).toEqual(createdUser2);
});
