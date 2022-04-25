import { findAddressByUserId, findUserByUsername } from "./api";

const UserInput = () => {
  let value = "";
  let error = "";

  function getValue() {
    return value;
  }

  function getError() {
    return error;
  }

  function setValue(inputValue) {
    value = inputValue;
  }

  // 지시사항을 참고하여 searchAddress() 함수를 구현하세요.
  function searchAddress() {
    error = "";

    return new Promise((resolve, reject) => {
      let user = findUserByUsername(value);
      if (user) return resolve(user);
      reject(error);
    })
      .then((user) => {
        let address = findAddressByUserId(user.id);
        if (address) return findAddressByUserId(user.id);
        reject(error);
      })
      .catch((e) => (error = e.message));
  }

  return { getError, getValue, setValue, searchAddress };
};

export default UserInput;
