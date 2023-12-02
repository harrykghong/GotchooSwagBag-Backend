import { Auth } from 'aws-amplify';

export function useAuth() {
  const signIn = async (username, password) => {
    return await Auth.signIn(username, password);
  };

  const signOut = async () => {
    return await Auth.signOut();
  };

  // other functionalities like signUp, confirmSignUp, etc.

  return { signIn, signOut /* , other exposed functions */ };
}
