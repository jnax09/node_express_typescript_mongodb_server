import { IsOptional, IsString, ValidateNested } from 'class-validator';
import CreateAddressDto from './Address';

class CreateUserDto {
    @IsString()
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @IsOptional()
    @ValidateNested()
    public address?: CreateAddressDto;
}

export default CreateUserDto;
