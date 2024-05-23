import { api } from '../../service';
import { useQuery } from '@tanstack/react-query';

function Index() {
    const getAllUsers = async () => {
        const { data: data } = await api.get(`user-all`)
        return data
    }
    const query = useQuery(
        {
            queryKey: ["user-all",],
            queryFn: () => {
                return getAllUsers();
            },
        }

    );
    return { query }
}

export default Index