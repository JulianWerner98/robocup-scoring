import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Settings {
    @Prop()
    basicMode: boolean;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);

export type SettingsDocument = Settings & Document