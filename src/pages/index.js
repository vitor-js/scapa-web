
import { Flex } from '@chakra-ui/react';

export default function Home() {
  return <Flex />;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/login',
      permanent: true,
    },
  };
};
