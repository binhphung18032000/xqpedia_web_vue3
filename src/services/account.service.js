import { uuid } from "vue-uuid";
import { Base64 } from "js-base64";
import axios from "axios";

const AccountService = {
  async submit(code, name, email = null, phone = null) {
    const account = {
      code: code,
      name: name,
      email: email == null ? "" : email,
      phone: phone == null ? "" : phone,
    };
    if (code == null || code.trim() === "") {
      account.code = uuid.v1();
    }
    const url = process.env.API_URL + "api/v1/player/register";
    return await axios
      .post(url, account)
      .then(function () {
        localStorage.setItem(
          "xqpedia_account",
          Base64.encode(JSON.stringify(account))
        );
        return account;
      })
      .catch(function (error) {
        console.log("Register Fail ", error);
        return null;
      });
  },

  getAccount() {
    let account = localStorage.getItem("xqpedia_account");
    if (account) {
      return JSON.parse(Base64.decode(account));
    }
    return null;
  },
};

export { AccountService };
