import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    createUser(
        @Body('username') username: string,
        @Body('email') email: string,
    ) {
        return this.usersService.createUser(username, email);
    }

    @Get()
    findUser(@Query('email') email: string) {
        return this.usersService.findUserByEmail(email);
    }

    @Post('google')
    async googleLogin(@Body('credential') credential: string) {
        return this.usersService.verifyGoogleToken(credential);
    }
}