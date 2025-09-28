// Simple test version of useUsers
import { useState } from 'react';

export const useUsersSimple = () => {
    const [users] = useState([]);
    const [loading] = useState(false);
    const [error] = useState(null);

    return {
        users,
        loading,
        error,
    };
};
