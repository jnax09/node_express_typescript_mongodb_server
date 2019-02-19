import { IsString, Length } from "class-validator";

class CreatePostDto {
    @IsString()
    @Length(3, 50)
    public author: string;

    @IsString()
    public content: string;

    @IsString()
    public title: string;
}

export default CreatePostDto;
