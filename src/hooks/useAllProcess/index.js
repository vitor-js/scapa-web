import { api } from '../../service';
import { useQuery } from '@tanstack/react-query';

function Index() {
    const getProccess = async () => {
        const { data: data } = await api.get(`proccess-all`)
        return data
    }
    const query = useQuery(
        {
            queryKey: ["proccess-all",],
            queryFn: () => {
                return getProccess();
            },
        }

    );
    return { query }
}

export default Index