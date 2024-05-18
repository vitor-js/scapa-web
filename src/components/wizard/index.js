
import Header from './header/index'
import Body from '../wrapperBody/index.js'
import { Box } from "@chakra-ui/react"


import React, {
    useReducer,
    useCallback,
    createContext,
    useMemo,
    useState,
} from 'react'


const reducer = (state, action) => {
    const { steps, activePageIndex, maxProgress } = state
    switch (action.type) {
        case 'NEXT_PAGE':
            const nextPageIndex = activePageIndex + 1

            if (nextPageIndex < steps) {
                state.maxProgress = maxProgress + 1
                return { ...state, activePageIndex: nextPageIndex }
            }
            return state

        case 'PREV_PAGE':
            if (activePageIndex > 0) {
                return { ...state, activePageIndex: activePageIndex - 1 }
            }
            return state

        case 'SPECIFIC_PAGE':
            if (action.payload.page >= maxProgress) return { ...state }
            return { ...state, activePageIndex: action.payload.page }

        default:
            return state
    }
}

export const WizardContext = createContext({})

const Wizard = ({ children }) => {
    const goNextPage = useCallback(() => {
        dispatch({ type: 'NEXT_PAGE' })
    }, [])

    const goPrevPage = useCallback(() => {
        dispatch({ type: 'PREV_PAGE' })
    }, [])

    const goSpecificPage = useCallback((page) => {
        dispatch({
            type: 'SPECIFIC_PAGE',
            payload: {
                page,
            },
        })
    }, [])

    const countPages = React.Children.toArray(children)

    const [state, dispatch] = useReducer(reducer, {
        activePageIndex: 0,
        steps: countPages.length,
        maxProgress: 1,
    })

    const CurrentPage = countPages[state.activePageIndex]

    const [pagesData, setPagesData] = useState({})

    const wizardController = useMemo(
        () => ({
            data: {
                totalPage: countPages.length,
                currentPage: state.activePageIndex + 1,
                data: pagesData,
            },
            actions: {
                goNextPage,
                goPrevPage,
                goSpecificPage,
                setPagesData,
            },
        }),
        [state, pagesData]
    )

    return (
        <WizardContext.Provider value={wizardController}>
            <Header />
            <Box my={5} />
            <Body>
                {CurrentPage}
            </Body>
        </WizardContext.Provider>
    )
}

export default Wizard
