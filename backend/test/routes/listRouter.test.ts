import chai, { expect } from 'chai';   
import {describe, it,before,after} from 'mocha'; 
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import conn from '../../src/connections/conn';
import Users from '../../src/models/user';
describe('List Router', () => {
    let token: string;
    let todoId: string;
  
    before(async () => {
      // Register a new user
      const registerResponse = await request(app).post('/api/v1/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Testpass@123',
      });
      expect(registerResponse.status).to.equal(201);
  
      // Sign in the user
      const signinResponse = await request(app).post('/api/v1/signin').send({
        email: 'test@example.com',
        password: 'Testpass@123',
      });
      expect(signinResponse.status).to.equal(200);
      token = signinResponse.body.token;
    });
  
    it('should add a new task', async () => {
        const user = await Users.findOne({ email: 'test@example.com' });
        console.log('User:', user);
        console.log(token);
        const response = await request(app).post('/api/v2/addTasks').set('Authorization', `Bearer ${token}`).send({
          title: 'Test Task',
          description: 'Test Description',
          email: user?.email,
        });
        expect(response.status).to.equal(200);
        todoId = response.body._id;
      });
      
  
    it('should update a task', async () => {
      const response = await request(app).put(`/api/v2/updateTasks/${todoId}`).set('Authorization', `Bearer ${token}`).send({
        title: 'Updated Test Task',
        description: 'Updated Test Description',
      });
      expect(response.status).to.equal(200);
    });
  
    it('should get a task by ID', async () => {
      const response = await request(app).get(`/api/v2/getTasks/${todoId}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).to.equal(200);
    });
  
    it('should delete a task', async () => {
      const response = await request(app).delete(`/api/v2/deleteTasks/${todoId}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).to.equal(200);
    });
  });
  
  
  