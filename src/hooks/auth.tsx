import React, {
    createContext,
    useState,
    useContext, 
    useEffect
} from 'react';
import api from '../services/api';
import { database } from '../database'
import { User as ModelUser } from '../database/models/user';

interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }){
    const [data, setData] = useState<User>({} as User);

    async function signIn({email, password }:SignInCredentials) {
        const response = await api.post('/sessions', {
            email,
            password
        }); 
        const { token, user } = response.data;
        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        const userCollection = database.get<ModelUser>('users');
        await database.write(async() => {
            await userCollection.create(newUser => {
                newUser.user_id = user.id,
                newUser.name = user.name,
                newUser.email = user.email,
                newUser.driver_license = user.driver_license
                newUser.avatar = user.avatar
            });       
        });      
        
        setData({ ...user, token });
    }
    
    useEffect(() => {
        async function loadUserData() {
            const userCollection = database.get<ModelUser>('users');
            const response = await userCollection.query().fetch();
            if (response.length > 0){
                const userData = response[0]._raw as unknown as User;
                api.defaults.headers["Authorization"] = `Bearer ${userData.token}`;
                setData(userData);
            }
        }

        loadUserData();
    })

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}

export {
    AuthProvider,
    useAuth
}