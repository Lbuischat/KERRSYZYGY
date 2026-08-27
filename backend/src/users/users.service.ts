import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
    private googleClient = new OAuth2Client();
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async createUser(username: string, email: string) {
        const user = new this.userModel({
            username,
            email,
        });

        return user.save();
    }

    async findUserByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async verifyGoogleToken(token: string) {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
        });

        const payload = ticket.getPayload();

        return payload;
    }
}