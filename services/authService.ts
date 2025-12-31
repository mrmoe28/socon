import { 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from './firebaseConfig';

export interface AuthError {
  code: string;
  message: string;
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (
  email: string, 
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    const authError: AuthError = {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'An unknown error occurred'
    };
    throw authError;
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    const authError: AuthError = {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'An unknown error occurred'
    };
    throw authError;
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    const authError: AuthError = {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'An unknown error occurred'
    };
    throw authError;
  }
};

/**
 * Get the current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Send password reset email
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    const authError: AuthError = {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'An unknown error occurred'
    };
    throw authError;
  }
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
