const express = require('express');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const scramble = require('../src/services/Scramble');

const app = express();

describe('GET Random Word', () => {
    it('should get a random word', () => {
        request(app)
        .get("https://random-word-api.herokuapp.com/word")
        .expect(200)
    });
    it('should fail to get a random word', () => {
        request(app)
        .get("https://random-word-api.herokuapp.com/getWord") // wrong endpoint
        .expect(400)
    });
});

describe('Scramble Word', () => {
    // check a scrambled word is not equal to the original
    it('should scramble a word', () => {
        const originalWord = 'hello';
        const scrambledWord = scramble(originalWord);
        expect(scrambledWord).to.not.equal(originalWord);
    });
    // check a scrambled word is equal to the original if the word is 1 char long
    it('should scramble a 1 char word to be the same word', () => {
        const originalWord = 'a';
        const scrambledWord = scramble(originalWord);
        expect(scrambledWord).to.equal(originalWord);
    });
    // check a 2 char scrambled word is separate from the original
    it('should scramble a 1 char word to be the same word', () => {
        const originalWord = 'hi';
        const scrambledWord = scramble(originalWord);
        expect(scrambledWord).to.not.equal(originalWord);
    });
});