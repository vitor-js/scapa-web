import { api } from '../../service';
import { useMutation, useQuery } from '@tanstack/react-query';

function Index(id, user_id) {
    const getProcces = async (id, user_id) => {

        if (!id || !user_id) return null
        const { data: data } = await api.get(`proccess/${user_id}/${id}`)
        console.log(data, 'aaaaaaaaaaaassssssssss')
        return data
    }
    const query = useQuery(
        {
            queryKey: ["procces", id, user_id],
            queryFn: () => {
                return getProcces(id, user_id);
            },
        }

    );
    return { query }
}

export default Index