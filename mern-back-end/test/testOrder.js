const server = require("../server");
const chai = require("chai");
const chaihttp = require("chai-http");
const Orders = require("../server/model/orderModel");

chai.should();
chai.use(chaihttp);

describe('Orders', async () => {
    try {
        await describe('/Orders', () => {
            /*
            * Test the /GET route for orders | with invalied route
            */

            it('it should Not GET all the orders without correct route', (done) => {
                chai.request(server)
                    .get('/orde')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });

        });
    }
    catch (err) {
        console.log(err);
    }
});
