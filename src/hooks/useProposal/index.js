import { api } from '../../service';
import { useMutation, useQuery } from '@tanstack/react-query';

function Index(id) {
    const getProcces = async (id) => {

        if (!id) return null
        const { data: data } = await api.get(`proposal/${id}`)
        return data
    }
    const query = useQuery(
        {
            queryKey: ["proposal", id],
            queryFn: () => {
                return getProcces(id);
            },
        }

    );
    return { query }
}

export default Index