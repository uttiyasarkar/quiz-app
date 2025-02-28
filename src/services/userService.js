const User = require('../models/user'); // Assuming you have a User model defined

class UserService {
    async createUser(userData) {
        try {
            console.log('Saving user data:', userData);
            const user = new User(userData);
            await user.save();
            console.log('User saved:', user);
            return user;
        } catch (error) {
            console.error('Error creating user in UserService:', error);
            throw error;
        }
    }
}

module.exports = UserService;