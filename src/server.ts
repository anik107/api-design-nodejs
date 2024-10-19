import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
    setTimeout(() => {
        next(new Error('Something went wrong'))
    }, 1)
});

app.use('/api', protect, router);

app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
   if(err.type === 'auth'){
       return res.status(401).json({ message: err.message })
   }else if(err.type === 'input'){
       return res.status(400).json({ message: err.message })
   }else{
       return res.status(500).json({ message: 'Something went wrong' })
   }
})

export default app;
