const express = require('express');
const chai = require('chai');
const request = require('supertest');

const app = express();

describe('GET Random Word', () => {
    it('should get a random word', () => {
        request(app)
        .get("https://random-word-api.herokuapp.com/word")
        .expect(200)
    });
    it('should get a random word', () => {
        request(app)
        .get("https://random-word-api.herokuapp.com/getWord")
        .expect(400)
    });
});
