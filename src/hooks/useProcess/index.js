import { api } from '../../service';
import { useMutation, useQuery } from '@tanstack/react-query';

function Index(id) {
    const getProccess = async (id) => {
        if (!id) return null
        const { data: data } = await api.get(`proccess/${id}`)
        return data
    }
    const query = useQuery(
        {
            queryKey: ["proccess", id],
            queryFn: () => {
                return getProccess(id);
            },
        }

    );
    return { query }
}

export default Index