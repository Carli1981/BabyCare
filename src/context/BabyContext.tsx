import React, { createContext, useContext, useState } from 'react';

type BabyData = {
  name?: string;
  birthdate?: Date;
  gender?: string;
  isPremature?: boolean;
  weightKg?: number;
  weightG?: number;
  heightCm?: number;
  photoUri?: string;
  feedingType?: string;
};

type BabyContextType = {
  babyData: BabyData;
  updateBabyData: (data: Partial<BabyData>) => void;
  resetBabyData: () => void;
};

const BabyContext = createContext<BabyContextType | undefined>(undefined);

export const BabyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [babyData, setBabyData] = useState<BabyData>({});

  const updateBabyData = (data: Partial<BabyData>) => {
    setBabyData((prev) => ({ ...prev, ...data }));
  };

  const resetBabyData = () => setBabyData({});

  return (
    <BabyContext.Provider value={{ babyData, updateBabyData, resetBabyData }}>
      {children}
    </BabyContext.Provider>
  );
};

export const useBabyContext = (): BabyContextType => {
  const context = useContext(BabyContext);
  if (!context) throw new Error('useBabyContext must be used within a BabyProvider');
  return context;
};
