const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Signup controller

exports.signup = async (req, res) => {
    const {name, email, password, batchYear} = req.body;

    try {
        const existingUser = await prisma.user.findUnique({where: {email}});
        if(existingUser){
            return res.status(400).json({message: 'Email already registered'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                batchYear: parseInt(batchYear)
            }
        })

        res.status (201).json({message: "User created succesfully", userId: user.id})
    } catch(err){
        res.status(500).json({error: err.message})
    }

    
} 

// Signin Controller

exports.signin = async (req, res)=> {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({where: {email}});
        if(!user) return res.status(400).json({message: 'Invalid email or password'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid email or password'});

        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1d'});
        
        res.json({message: 'Signin Successful'})
    } catch (err) {   
        res.status(500).json({error: err.message})
    }
}