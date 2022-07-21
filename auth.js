auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("guide").onSnapshot((snapshot) => {
        // console.log(snapshot.docs)
        setupGuides(snapshot.docs);
        setupUI(user);
      });
    console.log("logged In");
  } else {
    setupGuides([]);
    setupUI();
    console.log("Not logged in");
  }
});
// ------------------------
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("guide")
    .add({
      title: createForm.title.value,
      content: createForm.content.value,
    })
    .then(() => {
      // close the create modal & reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
// -------------------------
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log("clicked!")
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // console.log(email,password)

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred);
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("user out");
  });
});

// Login

const login = document.querySelector("#login-form");

login.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = login["login-email"].value;
  const password = login["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    login.reset();
  });
});
