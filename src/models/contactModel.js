const mongoose = require('mongoose');
const validator = require('validator');


const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  completeName: { type: String, require: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  date: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('contacts', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }

  async register() {
    this.validate();

    await ContactModel.create(this.body);
  }

  async edit() {
    this.validate();

    const id = this.body.id;
    delete this.body['id'];

    if (this.errors.length > 0) return;

    await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  // Static methods

  static async delete(id) {
    const contact = await ContactModel.findOneAndDelete({ _id: id });
    return contact;
  }

  static async searchContacts(caracter) {
    const contacts = await ContactModel.find({"completeName": new RegExp(caracter)})
      .sort({ date: -1 });
    return contacts;
  }

  static async findContact(id) {
    const contact = await ContactModel.findById(id);
    return contact;
  }

  static async allContacts() {
    const contacts = await ContactModel.find()
      .sort({ date: -1 });
    return contacts;
  }

  validate() {
    this.cleanUp();

    if (this.body.firstName.length < 1) {
      this.errors.push('Escolha um nome para o seu contato!');
    }

    if (this.body.email.length > 0 && !validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido.');
    }

    if (this.body.email.length < 1 && this.body.telefone.length < 1) {
      this.errors.push('Pelo menos o E-mail ou o Telefone devem ser enviados.')
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body.completeName = `${this.body.firstName} ${this.body.lastName}`;

    delete this.body['_csrf'];
  }
}


module.exports = Contact;
