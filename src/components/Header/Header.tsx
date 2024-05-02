import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="flex flex-row justify-between baseline p-5 lg:p-10">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Ammalgam Assignment
      </h1>
      <ConnectButton />
    </header>
  );
};

export default Header;
