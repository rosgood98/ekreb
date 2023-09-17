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
    it('should fail to get a random word', function(done) {
        request(app)
        .get("https://random-word-api.herokuapp.com/getWord") // wrong endpoint
        .expect(400)
        done();
    }, 100000);
});

describe('Scramble Word', () => {
    // check a scrambled word is not equal to the original
    it('should scramble a word', () => {
        setTimeout(function() {
            const originalWord = 'hello';
            const scrambledWord = scramble(originalWord);
            expect(scrambledWord).to.not.equal(originalWord);
        });
    });
    // check a scrambled word is equal to the original if the word is 1 char long
    it('should scramble a 1 char word to be the same word', function(done) {
            const originalWord = 'a';
            const scrambledWord = scramble(originalWord);
            expect(scrambledWord).to.equal(originalWord);
            done();
    }, 10000);
    // check a 2 char scrambled word is separate from the original
    it('should scramble a 1 char word to be the same word', function(done) {
            const originalWord = 'hi';
            const scrambledWord = scramble(originalWord);
            expect(scrambledWord).to.not.equal(originalWord);
            done();
    }, 100000);
});