import * as express from 'express';
import Post from '../interfaces/PostInterface';
import postModel from '../models/Post';
import PostNotFoundException from '../exceptions/PostNotFoundException';

import CreatePostDto from '../dto/Post';
import RequestWithUser from '../interfaces/RequestWithUser';

export class PostController {
    private post = postModel;

    public getAllPosts = async (request: express.Request, response: express.Response) => {
        const posts = await this.post.find().populate('author', '-password');
        response.send(posts);
    };

    public createPost = async (request: RequestWithUser, response: express.Response) => {
        const postData: CreatePostDto = request.body;
        const createdPost = new this.post({
            ...postData,
            author: request.user._id,
        });
        const savedPost = await createdPost.save();
        await savedPost.populate('author', '-password').execPopulate();
        response.send(savedPost);
    };

    public getPostById = (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const id = request.params.id;
        this.post.findById(id).then(post => {
            if (post) {
                response.send(post);
            } else {
                next(new PostNotFoundException(id));
            }
        });
    };

    public modifyPost = (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const id = request.params.id;
        const postData: Post = request.body;
        this.post.findByIdAndUpdate(id, postData, { new: true }).then(post => {
            if (post) {
                response.send(post);
            } else {
                next(new PostNotFoundException(id));
            }
        });
    };

    public deletePost = (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const id = request.params.id;
        this.post.findByIdAndDelete(id).then(successResponse => {
            if (successResponse) {
                response.send(200);
            } else {
                next(new PostNotFoundException(id));
            }
        });
    };
}

const postController = new PostController();

export default postController;
