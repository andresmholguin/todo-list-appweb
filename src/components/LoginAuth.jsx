import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const LoginAuth = () => {
  return (
    <div className="flex justify-center p-2 rounded-full bg-Dark-900 cursor-pointer">
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default LoginAuth;
