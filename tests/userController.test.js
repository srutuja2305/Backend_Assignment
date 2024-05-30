const request = require('supertest');
const app = require('../app');
const db = require('../models');

describe('User Registration and Authentication', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should login the user', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
