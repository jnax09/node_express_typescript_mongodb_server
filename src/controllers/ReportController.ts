import * as express from 'express';
import userModel from '../models/User';

class ReportController {
    private user = userModel;

    public generateReport = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const usersByCountries = await this.user.aggregate([
            {
                $match: {
                    'address.country': {
                        $exists: true,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        country: '$address.country',
                    },
                    users: {
                        $push: {
                            _id: '$_id',
                            name: '$name',
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'users._id',
                    foreignField: 'author',
                    as: 'articles',
                },
            },
            {
                $addFields: {
                    amountOfArticles: {
                        $size: '$articles',
                    },
                },
            },
            {
                $sort: {
                    amountOfArticles: 1,
                },
            },
        ]);
        response.send({
            usersByCountries,
        });
    };
}

const reportController = new ReportController();

export default reportController;
