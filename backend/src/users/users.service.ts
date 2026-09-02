import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
    private googleClient = new OAuth2Client();
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async createUser(
        username: string,
        email: string,
        password: string
    ) {
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = new this.userModel({
            username,
            email,
            password: hashedPassword,
        });

        return user.save();
    }

    async findUserByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async login(
        email: string,
        password: string
    ) {

        const user = await this.userModel.findOne({
            email
        });

        if (!user) {
            throw new Error('Invalid email or password.');
        }

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatches) {
            throw new Error('Invalid email or password.');
        }

        return user;
    }

    async verifyGoogleToken(token: string) {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
        });

        const payload = ticket.getPayload();

        return payload;
    }
}