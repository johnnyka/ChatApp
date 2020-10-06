import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import validation from '../../api/validation';
import { usernames } from '../../utils/users';

jest.mock('../../utils/users');
(usernames as jest.Mock).mockReturnValue([]); // Set dummy mock to default value.

const app = express();
app.use(bodyParser.json());
app.use('/api/validation', validation);

describe('POST /api/validation route', () => {
  it('Should respond 200 for valid username', (done: jest.DoneCallback) => {
    request(app)
      .post('/api/validation')
      .send({ name: 'validName' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        valid: true,
        msg: '',
      })
      .end(done);
  });

  it('Should respond 400 for empty username', (done: jest.DoneCallback) => {
    request(app)
      .post('/api/validation')
      .send({ name: '' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        valid: false,
        msg: 'Empty string is not allowed. Please enter a valid name.',
      })
      .end(done);
  });

  it('Should respond 400 on username with special character(s)', (done: jest.DoneCallback) => {
    request(app)
      .post('/api/validation')
      .send({ name: 'NameWith$pecialCharacter' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        valid: false,
        msg: 'Special characters are not allowed. Please enter a valid name.',
      })
      .end(done);
  });

  it('Should respond 400 on username that already exist', (done: jest.DoneCallback) => {
    const alreadyExistingName = 'Barack_Obama';

    (usernames as jest.Mock).mockReturnValue([alreadyExistingName]); // Real mock!

    request(app)
      .post('/api/validation')
      .send({ name: alreadyExistingName })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        valid: false,
        msg: 'The name is already taken. Try another one.',
      })
      .end(done);
  });
});
