import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', () => {
    let chaiHttpResponse: Response;

    const login = {
      email: 'test@trybe.com',
      password: 'password'
    };
  
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(login as User);
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
  it('checks if login is successful', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(login);
  expect(chaiHttpResponse.status).to.be.eq(200);
  expect(chaiHttpResponse.body.token).to.exist;
  });

  it('checks if returns error message on failed login', async () => {
    sinon.stub(User, 'findOne').resolves(undefined);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(login);

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');  });
});
