
export type Code = 'S' | 'X' | 'C' | '3' | 'Y';
export type ColorCode = 'white' | 'black' | 'blue' | 'grey' | 'red';

export interface CarModel {
    code: Code,
    description :string,
    colors: Colors[];
}
export interface Colors {
    code: ColorCode,
    description :string,
    price: number;
}
export interface CarImg {
    code: Code | null
    color: ColorCode | null,
}
export interface CarConfig{
    configs: CarDetails[],
    towHitch: boolean,
    yoke: boolean
}
export interface CarDetails{
    id: number,
    description: string,
    range: number,
    speed: number,
    price: number
}
export interface CarSummary{
   carModel: CarModel,
   color:Colors
   carConfig:CarConfig
}


