const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    //adding randomId to attrs
    attrs.id = this.randomId();
    //hashing and salting the password
    const salt = crypto.randomBytes(8).toString("hex");
    const hashed = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${hashed.toString("hex")}.${salt}`,
    };
    records.push(record);
    //update records array to users.json (this.filename)
    await this.writeAll(records);

    return record;
  }
  async comparePasswords(saved, supplied) {
    //saved - password saved in our db "hashed.salt"
    //supplied - password given to us by user
    const [hashed, salt] = saved.split(".");
    const hashedSupplied = await scrypt(supplied, salt, 64);

    return hashed === hashedSupplied.toString("hex");
  }
}

//exporting usersRepository
module.exports = new UsersRepository("users.json");

// async function test() {
//   const repo = new UsersRepository("users.json");

//   await repo.create({ email: "test@gmail.com", password: "pass12345" });

//   const users = await repo.getAll();

//   const user = await repo.getOne("fgafaf");

//   await repo.delete("fdb7141c");

//   await repo.update("fdb7141c", { name: "Dragan" });

//   const user = await repo.getOneBy({ name: "Dragan" });
// }

// test();
