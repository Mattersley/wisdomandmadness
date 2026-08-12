import React from 'react'

export type ProjectType = {
  id: number;
  name: string;
  tagline?: string;
  overview?: string;
  served: string[];
  stack?: string[];
  image: {
    alt: string;
    src: string;
    height: number;
    width: number;
  };
  urls: {
    url: string;
    favi: string;
  }[];
  bgColours: {
    '1': string;
    '2': string;
  };
  bgImage?: string;
  bgOpacity: number;
  dark?: boolean;
  theme?: string;
  z: number;
  infoPosition?: string;
  content?: React.ReactNode;
  colourPalettes?: { pal?: string[]; bg?: string[] };
};
