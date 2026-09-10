import {
    Controller,
    Post,
    Body,
    Get,
    Query
} from '@nestjs/common';

import {
    UsersService
} from './users.service';


@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }


    // =========================================================
    // CREATE ACCOUNT
    // =========================================================

    @Post()
    createUser(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {

        return this.usersService.createUser(
            username,
            email,
            password
        );

    }


    // =========================================================
    // FIND USER
    // =========================================================

    @Get()
    findUser(
        @Query('email') email: string
    ) {

        return this.usersService.findUserByEmail(
            email
        );

    }


    // =========================================================
    // GOOGLE LOGIN
    // =========================================================

    @Post('google')
    async googleLogin(
        @Body('credential') credential: string
    ) {

        return this.usersService.verifyGoogleToken(
            credential
        );

    }


    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return this.usersService.login(
            email,
            password
        );
    }
}