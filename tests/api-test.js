const chai = require("chai");
const chaiHttp = require("chai-http");
var CryptoJS = require('crypto-js')

const { expect } = chai;
chai.use(chaiHttp);

describe("Call /v1/public/series and test for all authorisation error codes listed here with their correct error message", () => {
  var d = Date.now()
  var ts = d.toString()
  var publicKey = '8d85b20aa16de80afdb5734d48b72bcf'
  var privateKey = '7c14a68909d748288a1cd15de9e66ff6a08c6ed6'
  var hash = CryptoJS.MD5(ts + privateKey + publicKey);
  var hashText = hash.toString()
    
  it("Validate that Status code is 409 - Missing API Key", done => {
    chai
      .request('http://gateway.marvel.com')
      .get('/v1/public/series?ts=' + ts + '&hash=' + hashText)
      .end((err, res) => {
        console.log(res.text)
        var statCode = res.status
        expect(res).to.have.status(409);
        expect(res.body.message).to.contain("You must provide a user key.");
        done();
      });
  });


  it("Validate that Status code is 409 - Missing Hash", done => {
    chai
      .request('http://gateway.marvel.com')
      .get('/v1/public/series?ts=' + ts + + '&apikey='+publicKey)
      .end((err, res) => {
        // console.log(res)
        console.log(res.text)

        var statCode = res.status

        console.log(statCode)
        expect(res).to.have.status(409);
        expect(res.body.message).to.contain("You must provide a user key.");
        done();
      });
  });

  it("Validate that Status code is 409 - Missing Timestamp", done => {
    chai
      .request('http://gateway.marvel.com')
      .get('/v1/public/series?' + 'apikey='+publicKey+ '&hash=' + hashText)
      .end((err, res) => {
        // console.log(res)
        console.log(res.text)

        var statCode = res.status

        console.log(statCode)
        expect(res).to.have.status(409);
        expect(res.body.message).to.contain("You must provide a timestamp.");
        done();
      });
  });

//   NOT WORKING CURRENTLY
//   it("Validate that Status code is 401 -   Invalid Referer", done => {
//     chai
//       .request('http://abc.marvel.com')
//       .get('/v1/public/series?ts='+ts+ '&apikey='+publicKey+'&hash='+hashText)
//       .end((err, res) => {
//         // console.log(res)
//         console.log(res.text)

//         var statCode = res.status

//         console.log(statCode)
//         expect(res).to.have.status(401);
//         expect(res.body.message).to.contain("Invalid Referer");
//         done();
    //   });
//   });

  it("Validate that Status code is 409 - Missing Timestamp", done => {
    chai
      .request('http://gateway.marvel.com')
      .get('/v1/public/series?ts='+ts+ '&apikey='+publicKey+'&hash=123456')
      .end((err, res) => {
        // console.log(res)
        console.log(res.text)

        var statCode = res.status

        console.log(statCode)
        expect(res).to.have.status(401);
        expect(res.body.message).to.contain("That hash, timestamp and key combination is invalid.");
        done();
      });
  });

  it("Validate that Status code is 409 - Missing Timestamp", done => {
    chai
      .request('http://gateway.marvel.com')
      .post('/v1/public/series?ts='+ts+ '&apikey='+publicKey+'&hash='+hashText)
      .end((err, res) => {
        // console.log(res)
        console.log(res.text)

        var statCode = res.status

        console.log(statCode)
        expect(res).to.have.status(405);
        expect(res.body.message).to.contain("POST is not allowed");
        done();
      });
  });

//   403 error NEED TO GET IT WORKING
  it("Validate that Status code is 403 - Missing Timestamp", done => {
    chai
      .request('https://abc.marvel.com')
      .get('/v1/public/series?ts='+ts+ '&apikey='+publicKey+'&hash='+hashText)
      .end((err, res) => {
        // console.log(res)
        console.log(res.text)

        var statCode = res.status

        console.log(statCode)
        expect(res).to.have.status(403);
        done();
      });
  });


  describe("Call /v1/public/comics/27649 verify the status code is equal to 200 and that the response payload matches the Comic type definition (first level only, not going deeper into CharacterList or other types, only confirming that it is a list with items)", () => {
    
    it("Validate that Status code is 409 - Missing API Key", done => {
      chai
        .request('http://gateway.marvel.com')
        .get('/v1/public/comics/27649?ts='+ts+ '&apikey='+publicKey+'&hash='+hashText)
        .end((err, res) => {
          console.log(res.text)
  
          var statCode = res.status
  
          console.log(statCode)
          expect(res).to.have.status(200);

          var json = res.text
          var obj = JSON.parse(json)
          var res = obj.data.results;

          console.log(res[0].format);
          expect(res[0].format).equal('Comic');
          console.log(res[0].characters.items);
          expect(res[0].characters.items).to.be.an('array');
          done();
        });
    });
  });


  describe("Call /v1/public/characters/1011010 , verify the name of this character is Spider-Man(Ultimate) and that the last modification was later than January 2014. Please also ensure, that the provided thumbnail is a valid image url", () => {
    
    it("Validate that Status code is 409 - Missing API Key", done => {
      chai
        .request('http://gateway.marvel.com')
        .get('/v1/public/characters/1011010?ts='+ts+ '&apikey='+publicKey+'&hash='+hashText)
        .end((err, res) => {
          // console.log(res)
          console.log(res.text)
  
          var statCode = res.status
  
          console.log(statCode)
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          var json = res.text
          var obj = JSON.parse(json)
          var a = obj.data.results;

          console.log(a[0].name);
          //DATE Logic needs to be implemented
          console.log(a[0].modified);
          
          console.log(a[0].thumbnail.extension);

          expect(a[0].name).to.contain("Spider-Man (Ultimate)");
          expect(a[0].thumbnail.extension).equal("jpg");




          done();
        });
    });
  });

  describe("Call /v1/public/characters/1011010xxxxxx , that calling this endpoint should NOT return Spider-Man (Ultimate) as well but a 404 status code (it will fail but that is what we want) ", () => {
    it("Validate that Status code is 409 - Missing API Key", done => {
      chai
        .request('http://gateway.marvel.com')
        .get('/v1/public/characters/1011010xxxxxx?ts='+ts+ '&apikey='+publicKey+'&hash='+hashText)
        .end((err, res) => {
          console.log(res.text)
  
          var statCode = res.status
  
          console.log(statCode)
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          var json = res.text
          var obj = JSON.parse(json)
          var a = obj.data.results;

          console.log(a[0].name);

          expect(a[0].name).to.not.equal("Spider-Man (Ultimate)");
          done();
        });
    });
  });

});