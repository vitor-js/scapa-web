import React, { useState } from 'react';
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import { MdAddCircle } from "react-icons/md";
import { useColors } from '../../../../../hooks'

function Index({ setOpenSelect }) {
    const colors = useColors()

    return (
        <Flex
            _hover={{
                background: colors.hoverbackground,
                borderColor: colors.border.hoverColor,
            }}
            onClick={() => {
                setOpenSelect(true)
            }}
            cursor={'pointer'}
            bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} w={'100%'} flexDirection={'row'}>
            <MdAddCircle color={colors.text} size={40} />
            <Text fontSize={18} mt={2} fontWeight={400} ml={3} mr={3} >
                Clique para criar seu primeiro pedido
            </Text>
        </Flex>
    );
}

export default Index;