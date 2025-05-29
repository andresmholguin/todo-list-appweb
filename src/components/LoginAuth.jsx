import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const LoginAuth = () => {
  return (
    <div className="flex justify-center p-2 rounded-full bg-Dark-900">
      <SignedOut>
        <SignInButton>
          <button className="px-2 bg-amber-500 text-white rounded-lg hover:bg-amber-500/50 transition-all  cursor-pointer">
            Iniciar sesión
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default LoginAuth;
