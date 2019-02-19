import * as express from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import RequestWithUser from '../interfaces/RequestWithUser';
import postModel from '../models/Post';
import userModel from '../models/User';

export class UserController {
    private post = postModel;
    private user = userModel;

    public getMe = async (
        request: RequestWithUser,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const userId = request.user._id;
        const user = await this.user.findById(userId).select('-password');
        response.send(user);
    };

    public getAllPostsOfUser = async (
        request: RequestWithUser,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const userId = request.params.id;
        if (userId === request.user._id.toString()) {
            const posts = await this.post.find({ author: userId });
            response.send(posts);
        }
        next(new NotAuthorizedException());
    };
}
const userController = new UserController();

export default userController;
