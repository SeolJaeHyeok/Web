const App = () => {
  const usernameInput = document.getElementById("username");
  const usernameForm = document.getElementById("username-form");
  const submitButton = document.getElementById("submit");
  const result = document.getElementById("result");
  const component = UserInput();

  usernameForm.addEventListener("submit", (e) => {
    e.preventDefault();

    component.searchAddress().then((res) => {
      if (component.getError()) {
        result.innerHTML = component.getError();
        return;
      }
      result.innerHTML = res.address;
    });
  });

  usernameInput.addEventListener("input", (e) => {
    component.setValue(e.target.value);
  });
};

export default App;
