var LotteryFactory = artifacts.require("./LotteryFactory.sol");
var assert = require('assert');
var web3 = require('web3');

contract('ContractFactory', (accounts) => {
    describe('Effectively Complete Lottery', async () => {
        before(async () => {
            this.lottery_factory = await LotteryFactory.deployed();
        })
        it('Initiate First Lottery', async () => {
            var count = await this.lottery_factory.get_lottery_count();
            assert.equal(count, 1, "Count is not 1");
        })
        it('Retrieve Magic Number', async () => {
            this.magic_number = await this.lottery_factory.get_magic_number();
            assert("Magic Number should be in range [1-9]: ", this.magic_number > 0 && this.magic_number < 10);
        })
        it('Make 2 failing guesses', async () => {
            await this.lottery_factory.make_guess(this.magic_number+1, {from: accounts[0], value: web3.utils.toWei('0.25', 'ether') });
            await this.lottery_factory.make_guess(this.magic_number-1, {from: accounts[1], value: web3.utils.toWei('0.35', 'ether') });

            var total_guesses = await this.lottery_factory.get_total_guesses();
            assert.equal(total_guesses, 2, "Total Guesses should = 2");
        })
        it('Make a winning guess', async () => {
            await this.lottery_factory.make_guess(this.magic_number, {from: accounts[2], value: web3.utils.toWei('0.25', 'ether') });
        })
    })
    describe('New lottery is created', () => {
        it('Check LotteryFactory has a new child', async () => {
            this.num_of_children = await this.lottery_factory.get_lottery_count();
            assert.equal(this.num_of_children, 2, "LotteryContract does not have 1 child");
        })
        it('Check newest lottery has no guesses', async () => {
            this.num_of_guesses = await this.lottery_factory.get_total_guesses();
            assert.equal(this.num_of_guesses, 0, "LotteryContract has more than 0 guesses.");
        })
    })
})