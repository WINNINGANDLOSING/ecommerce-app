// checking if inputted email is in valid format
/*
      \S+
      One or more non-whitespace characters
      @   
      The @ symbol (mandatory for emails)
      \S+
      One or more non-whitespace characters again (e.g., domain name)
      \.
      A literal dot . (escaped with \)
      \S+
      One or more non-whitespace characters again (e.g., .com)
      khoa1@gmail.com
       /\S+@\S+\.\S+/
      */
export const isValidEmail = (email: string) => {
  // starting with non space character, then @ (mandatory), then another non space character (domain name) (e.g gmail),
  // then continue with a literal dot, then another non space character (TLD (top-level domain) e.g .com )
  // /\S+@\S+\.\S+/
  return /\S+@\S+\.\S+/.test(email);
};

// we need userCart to update its state each time user add a new item into cart, so put this function in context
// instead of any component, so when we finish adding said item to firestore, update the userCart to match

export const isValidUsername = (username: string) => {
  // letters, number, and underscore allowed
  // no special characters
  // must be between 3-20 characters
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

export const isValidPassword = (password: string) => {
  // ?=.* means contain at least
  // must contain at least one uppercase A-Z
  // must contain at least one lowercase a-z
  // must contain at least one number \d
  // must contain at least one special character \W_
  // at least 6 characters long {6,}
  //return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/.test(password);
};
