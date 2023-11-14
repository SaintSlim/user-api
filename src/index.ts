import express, { Request, Response} from 'express';
import bodyParser from 'body-parser';
import User from '../models/user';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json())

const secretKey = 'secret-key'

// Function to check if user exists
async function findUser(email: string) {
    const user = await User.findOne({ where: { email }});
    return user;
}

// User registration endpoint
app.post('/register', async (req: Request, res: Response) => {
    try {
        const { email } = req.body

        // Check for existing user in database with email
        // If user exists return 400 status code with error 'user with email already exists'
        const existingUser = await findUser(email);

        if (existingUser) {
            return res.status(400).json({ error: `User with email: ${email} already exists`})
        }

        // Opportunity to use bycrpt to hash password before storing it in database
        const user = await User.create(req.body);
        return res.status(201).json(user)
    } catch (error) {
        return res.status(404).json({ error: error })
    }

})

// User delete endpoint
app.delete('/delete/:id', async (req: Request, res: Response) => {
    const uid = req.params.id;
    // Check if user is authorized to delete user entry. e.g User is an administrator or require confirmation code sent to user email to complete deletion
    // Example: If using session based authentication pull user details from req.session.user

    // After user has been Authorized
    try {
        // Check if user exists
        const user = await User.findByPk(uid);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await user?.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// User login endpoint
app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }});

    if (!user) {
        return res.status(401).json({ error: 'Authentication failed' })
    }

    const passwordMatch = bycrpt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' })
    }

    // If user exists and password matches Generate jwt and send as response
    const token = jwt.sign({ id: user.id, email:user.email}, secretKey)
    return res.json({ token })
})

// User logout endpoint
app.post('/logout', async (req: Request, res: Response) => {
    // Delete stored token or invalidate token by incrementing stored token by 1
    res.json({ message: 'Logout successful'})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
