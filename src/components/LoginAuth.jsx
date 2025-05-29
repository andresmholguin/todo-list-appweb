import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const LoginAuth = () => {
  return (
    <div className="flex justify-center items-center p-2 ">
      <SignedOut>
        <SignInButton>
          <button className="px-2 hover:bg-gray-950 text-white rounded-lg bg-gray-900 shadow-md shadow-amber-700 transition-all  cursor-pointer h-10">
            Iniciar sesión
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="flex justify-center items-center ring-2 ring-amber-700 rounded-full h-7">
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default LoginAuth;
