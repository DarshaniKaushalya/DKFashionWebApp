const server = require("../server");
const chai = require("chai");
const chaihttp = require("chai-http");
const Product = require("../server/model/productModel");

chai.should();
chai.use(chaihttp);

describe("Product", async () => {
  try {
    /*
     * Test the /GET route for products
     */
    await describe("/GET products", () => {
      it("it should GET all the products", (done) => {
        chai
          .request(server)
          .get("/product")

          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
      /*
       * Test the /GET route for products || route is invalid
       */
      it("it should Not GET all the products", (done) => {
        chai
          .request(server)
          .get("/productss")
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });

    /*
     * Test the /GET/:id route || Get product by id
     */
    await describe("/GET/:id product", () => {
      it("it should GET a product by the given id", (done) => {
        let product = new Product({
          id: "622a259a1b2b89a03d97ea45",
          name: "Frock",
          price: "5000",
          cloudinaryId: "dx5ibohuddsothkvnvuu",
        });
        product.save((err, product) => {
          chai
            .request(server)
            .get("/products/" + product.id)
            .send(product)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("name");
              res.body.should.have.property("price");
              res.body.should.have.property("cloudinaryId");
              res.body.should.have.property("id").eql(product.id);
              done();
            });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});
