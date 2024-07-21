import chai, { expect } from 'chai';  
import sinon from 'sinon';  
import {describe, it,before,after} from 'mocha'; 


 
import authRouter from './../../src/routes/auth';  
import express, { Request, Response } from 'express';  
import sinonChai from 'sinon-chai';  

import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import conn from '../../src/connections/conn';
import Users from '../../src/models/user';

before(async () => {
    await conn();
  });
  
  after(async () => {
    await mongoose.disconnect();
  });
  
  describe('Auth Router', () => {
    it('should return 201 status and user data if register is successful', async () => {
      const response = await request(app).post('/api/v1/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Testpass@123',
      });
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('user');
    });
  
    it('should return 400 status if register is unsuccessful', async () => {
      await request(app).post('/api/v1/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Testpass@123',
      });
      const response = await request(app).post('/api/v1/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Testpass@123',
      });
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('User already exists');
    });
  
    it('should return 200 status and token if signin is successful', async () => {
      await request(app).post('/api/v1/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Testpass@123',
      });
      const response = await request(app).post('/api/v1/signin').send({
        email: 'test@example.com',
        password: 'Testpass@123',
      });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  
    it('should return 400 status if signin is unsuccessful', async () => {
      const response = await request(app).post('/api/v1/signin').send({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('please SignUp to continue');
    });
  });
  
  
