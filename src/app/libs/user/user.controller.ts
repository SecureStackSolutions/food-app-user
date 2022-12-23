import { Request, Response } from 'express';
import { loginUserControl } from './controls/loginUserControl';
import { generateVerificationCodeControl } from './controls/generateVerificationCodeControl';
import { updateUserInfoControl } from './controls/updateUserInfoControl';
import { verifyVerificationCodeControl } from './controls/verifyVerificationCodeControl';
import { generateTokens } from '../shared/generateTokens';

interface CustomRequest<T> extends Request {
    body: T;
}

export class UserController {
    static async loginUser(
        req: CustomRequest<{ email: string }>,
        res: Response
    ) {
        try {
            const user = await loginUserControl(req.body);
            return res.status(200).send(
                createResponse({
                    type: 'Success',
                    extras: { validUntil: user.verification.validUntil },
                })
            );
        } catch (err) {
            if (err instanceof Error) {
                createResponse({ type: 'Error', message: err.message });
            }

            return res.status(400).send(
                createResponse({
                    type: 'Error',
                    message: 'An unknown error occured',
                })
            );
        }
    }

    static async updateUser(
        req: CustomRequest<{
            name: string;
            _extras: {
                authenticationTokenPayload: {
                    [key: string]: any;
                };
            };
        }>,
        res: Response
    ) {
        try {
            const { email, userId } =
                req.body._extras.authenticationTokenPayload;

            const { name } = await updateUserInfoControl({
                name: req.body.name,
                userId: +userId,
            });

            await generateTokens(res, name, email, +userId);

            return res.status(200).send(
                createResponse({
                    type: 'Success',
                    message: 'User information is updated',
                })
            );
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .send(
                        createResponse({ type: 'Error', message: err.message })
                    );
            }

            return res.status(400).send(
                createResponse({
                    type: 'Error',
                    message: 'An unknown error occured',
                })
            );
        }
    }

    static async generateVerificationCode(
        req: CustomRequest<{ email: string }>,
        res: Response
    ) {
        try {
            const validUntil = await generateVerificationCodeControl(req.body);
            return res
                .status(200)
                .send(
                    createResponse({ type: 'Success', extras: { validUntil } })
                );
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .send(
                        createResponse({ type: 'Error', message: err.message })
                    );
            }
            return res.status(400).send(
                createResponse({
                    type: 'Error',
                    message: 'An unknown error occured',
                })
            );
        }
    }

    static async verifyVerificationCode(
        req: CustomRequest<{ email: string; verificationCode: string }>,
        res: Response
    ) {
        try {
            const { email, name, id } = await verifyVerificationCodeControl(
                req.body
            );

            await generateTokens(res, name, email, id);

            return res.status(200).send(
                createResponse({
                    type: 'Success',
                    message: 'User logged in',
                    extras: { userShouldSetInfo: name === null },
                })
            );
        } catch (err) {
            if (err instanceof Error) {
                return res
                    .status(400)
                    .send(
                        createResponse({ type: 'Error', message: err.message })
                    );
            } else {
                return res.status(400).send(
                    createResponse({
                        type: 'Error',
                        message: 'An unknown error occured',
                    })
                );
            }
        }
    }
}

interface createResponseInput {
    type: string;
    message?: string;
    results?: ResultsResponseType[];
    extras?: ResultsResponseType;
}

function createResponse({
    type,
    message = '',
    results = [],
    extras = {},
}: createResponseInput) {
    return { type, message, results, extras };
}

interface ResultsResponseType {
    [key: string]: any;
}
