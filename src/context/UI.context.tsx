import { CardType } from '@/components/Document/Document.Card';
import { PropsWithChildren, createContext, useState } from 'react';

export interface UIContext {
  cardType: CardType;
  setCardType: (v: CardType) => void;
}

export const UIContext = createContext<UIContext>({ cardType: 'normal', setCardType: () => 0 });

export const UIProvider = (props: PropsWithChildren) => {
  const [cardType, setCardType] = useState<CardType>('normal');

  return (
    <UIContext.Provider value={{ cardType, setCardType }}>{props.children}</UIContext.Provider>
  );
};
