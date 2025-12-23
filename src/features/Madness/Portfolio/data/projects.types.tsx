export type ProjectType = {
    bgColours: {
      '1': string;
      '2': string;
    };
    bgImage?: string;
    bgOpacity: number;
    dark?: boolean;
    image: {
      alt: string;
      src: string;
      height: number;
      width: number;
    };
    name: string;
    served: string[];
    urls:
      {
        url: string,
        favi: string
      }[];
    z: number;
}