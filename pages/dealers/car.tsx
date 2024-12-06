import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Button, Pagination, Typography } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AgentCard from '../../libs/components/common/AgentCard';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Member } from '../../libs/types/member/member';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TARGET_MEMBER, LIKE_TARGET_PROPERTY } from '../../apollo/user/mutation';
import { GET_AGENTS, GET_PROPERTIES } from '../../apollo/user/query';
import { sweetMixinErrorAlert, sweetMixinSuccessAlert } from '../../libs/sweetAlert';
import { Message } from '../../libs/enums/common.enum';
import { Messages } from '../../libs/config';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import DealerCard from '../../libs/components/common/DealerCard';
import PropertyCard from '../../libs/components/property/PropertyCard';
import { T } from '../../libs/types/common';
import { Property } from '../../libs/types/property/property';


export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const AgentList: NextPage = ({ initialInput, ...props }: any) => {
    const device = useDeviceDetect();
    const router = useRouter();
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [filterSortName, setFilterSortName] = useState('Recent');
    const [sortingOpen, setSortingOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchFilter, setSearchFilter] = useState<any>(
        router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
    );
    const [agents, setAgents] = useState<Member[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');

    /** APOLLO REQUESTS **/
    const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

    const {
        loading: getAgentsLoading,
        data: getAgentsData,
        error: getAgentsError,
        refetch: getAgentsRefetch,
    } = useQuery(GET_AGENTS, {
        fetchPolicy: 'network-only',
        variables: { input: searchFilter },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setAgents(data?.getAgents?.list);
            setTotal(data?.getAgents?.metaCounter[0]?.total);
        },
    });

    const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
    const {
        loading: getPropertiesLoading,
        data: getPropertiesData,
        error: getPropertiesError,
        refetch: getPropertiesRefetch
    } = useQuery(GET_PROPERTIES, {
        fetchPolicy: 'network-only',
        variables: { input: searchFilter },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setProperties(data?.getProperties?.list);
            setTotal(data?.getProperties?.metaCounter[0]?.total);
        },
    });
    /** LIFECYCLES **/
    useEffect(() => {
        if (router.query.input) {
            const input_obj = JSON.parse(router?.query?.input as string);
            setSearchFilter(input_obj);
        } else
            setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
    }, [router]);

    /** HANDLERS **/
    const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setSortingOpen(true);
    };

    const sortingCloseHandler = () => {
        setSortingOpen(false);
        setAnchorEl(null);
    };

    const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        switch (e.currentTarget.id) {
            case 'recent':
                setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: 'DESC' });
                setFilterSortName('Recent');
                break;
            case 'old':
                setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: 'ASC' });
                setFilterSortName('Oldest order');
                break;
            case 'likes':
                setSearchFilter({ ...searchFilter, sort: 'memberLikes', direction: 'DESC' });
                setFilterSortName('Likes');
                break;
            case 'views':
                setSearchFilter({ ...searchFilter, sort: 'memberViews', direction: 'DESC' });
                setFilterSortName('Views');
                break;
        }
        setSortingOpen(false);
        setAnchorEl2(null);
    };

    const paginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
        searchFilter.page = value;
        await router.push(`/dealers?input=${JSON.stringify(searchFilter)}`, `/dealers?input=${JSON.stringify(searchFilter)}`, {
            scroll: false,
        });
        setCurrentPage(value);
    };

    const likeMemberHandler = async (user: any, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Messages.error2);

            await likeTargetMember({
                variables: {
                    input: id,
                },
            });

            await getAgentsRefetch({ input: searchFilter });
            await sweetMixinSuccessAlert('success', 800);
        } catch (err: any) {
            console.log('Error, likeMemberHandler', err.message);
            sweetMixinErrorAlert(err.message).then();
        }
    }

    const likePropertyHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

            await likeTargetProperty({
                variables: { input: id },
            });
            await getPropertiesRefetch({ input: initialInput });
        } catch (err: any) {
            console.log('Error, likePropertyHandler:', err.message);
            sweetMixinErrorAlert(err.message).then();
        }
    }


    if (device === 'mobile') {
        return <h1>AGENTS PAGE MOBILE</h1>;
    } else {
        return (
            <Stack className={'car-page'}>
                <Stack className={'container'}>
                    <Stack className={'card-wrap'}>
                        {properties?.length === 0 ? (
                            <div className={'no-data'}>
                                <img src="/img/icons/icoAlert.svg" alt="" />
                                <p>No Dealers found!</p>
                            </div>
                        ) : (
                            properties.map((property: Property) => {
                                return <PropertyCard property={property} key={property?._id} likePropertyHandler={likePropertyHandler} />;
                            })
                        )}
                    </Stack>
                    <Stack className={'pagination'}>
                        <Stack className="pagination-box">
                            {agents.length !== 0 && Math.ceil(total / searchFilter.limit) > 1 && (
                                <Stack className="pagination-box">
                                    <Pagination
                                        page={currentPage}
                                        count={Math.ceil(total / searchFilter.limit)}
                                        onChange={paginationChangeHandler}
                                        shape="circular"
                                        color="primary"
                                    />
                                </Stack>
                            )}
                        </Stack>

                        {agents.length !== 0 && (
                            <span>
                                Total {total} dealer{total > 1 ? 's' : ''} available
                            </span>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        );
    }
};

AgentList.defaultProps = {
    initialInput: {
        page: 1,
        limit: 10,
        sort: 'createdAt',
        direction: 'DESC',
        search: {},
    },
};

export default withLayoutBasic(AgentList);