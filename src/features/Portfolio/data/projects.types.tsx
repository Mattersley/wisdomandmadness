export type ProjectType = {
    bgColours: {
      '1': string;
      '2': string;
    };
    image: {
      alt: string;
      src: string;
      height: number;
      width: number;
    };
    name: string;
    served: string[];
    url: string;
    z: number;
}