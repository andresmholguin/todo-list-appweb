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
          <button className="px-2 bg-gray-950 text-white rounded-lg hover:bg-gray-900 hover:shadow-sm hover:shadow-amber-700 transition-all  cursor-pointer">
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
