import { IsUrl, IsNotEmpty,  } from 'class-validator';

export class CreateCutterUrlDto {
    @IsUrl(
        { require_protocol: true, protocols: ['http', 'https'] },
        { message: 'Passe uma URL válida, começando com http:// ou https://' },
    )
    @IsNotEmpty({ message: 'Passe uma URL válida' })
    rawUrl: string;
}
