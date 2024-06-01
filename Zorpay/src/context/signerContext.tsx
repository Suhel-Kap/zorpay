import {ethers} from 'ethers';
import {ReactNode, createContext, useContext, useState} from 'react';

const SignerContext = createContext({
  signer: null as ethers.Signer | null,
  setSigner: (signer: ethers.Signer) => {},
});

export const useTabsContext = () => {
  return useContext(SignerContext);
};

interface SignerContextProviderProps {
  children: ReactNode;
}

export const SignerProvider = ({children}: SignerContextProviderProps) => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  return (
    <SignerContext.Provider value={{signer, setSigner}}>
      {children}
    </SignerContext.Provider>
  );
};
