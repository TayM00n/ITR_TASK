const mocha = require('mocha');
const assert = require('assert');
const fetch = require("node-fetch");

const home = "http://localhost:3000/api/auth/";

const formLogin = [
  {
    email: "test1@test.com",
    password: "newpass1011"
  },
];

const formReg = [
  {
    email: "test74@test.com",
    password: "newpass1011"
  },
];


describe("Test reg|log", function () {

  it('[REG]should true', function (done) {
    const urlLogin = home + "registration";
    formReg.forEach(async (item) => {
      const res = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      if (data.message != 'User has been created') {
        done(data.message);
      }
    });
    done();
  });

  it('[LOG]should true', function (done) {
    const urlLogin = home + "login";

    formLogin.forEach(async (item) => {
      const res = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await res.json()
      if (!res.ok) {
        done(data.message);
      }
    });
    done();
  });
});