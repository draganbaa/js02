const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename.");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    //open file called this.filename
    //parse content
    //return parsed data
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf-8",
      })
    );
  }

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

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found!`);
    }
    //object.assign takes everything from second attribute and writes on first attribute
    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
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
